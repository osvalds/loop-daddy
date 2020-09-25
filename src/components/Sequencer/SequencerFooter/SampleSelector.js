import {useEffect, useRef, useState} from "react"
import styled, {css} from "styled-components"
import useSize from "../../../customHooks/useSize";
import * as Tone from "tone";
import WaveformData from "waveform-data";
import {GlowUpKnob, MidpointGlowUpKnob, MODIFIER_KNOB_SIZE} from "../../Knob/GlowupKnob";
import {useRecoilValue, useRecoilState} from "recoil";
import {
    SelectedSampleFile_,
    SelectedSampleType_,
    SampleList_,
    SelectedSample_,
    samplesList, SelectedSamplePitch_, SelectedSampleVolume_
} from "../Samples/Samples.rcl";

const WaveformCanvasStyled = styled.canvas`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const scaleY = (amplitude, height) => {
    const range = 256;
    const offset = 128;

    return height - ((amplitude + offset) * height) / range;
}

const getGradient = (ctx, lighterColor, darkerColor) => {
    let gradient = ctx.createLinearGradient(0, 0, 200, 0);

    gradient.addColorStop(.6, darkerColor)
    gradient.addColorStop(.2, lighterColor)

    return gradient
}

const drawWaveform = (ctx, waveform, canvasSize) => {
    ctx.fillStyle = "hsl(240,4%,9%)"
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

    ctx.beginPath();

    const channel = waveform.channel(0);


    // Loop forwards, drawing the upper half of the waveform
    for (let x = 0; x < waveform.length; x++) {
        const val = channel.max_sample(x);

        ctx.lineTo(x, scaleY(val, canvasSize.height));
    }

    // Loop backwards, drawing the lower half of the waveform
    for (let x = waveform.length - 1; x >= 0; x--) {
        const val = channel.min_sample(x);

        ctx.lineTo(x, scaleY(val, canvasSize.height));
    }

    ctx.closePath()
    ctx.lineWidth = 1.5
    ctx.fillStyle = "radial-gradient(#ffea28,#ec983c)"
    ctx.fillStyle = getGradient(ctx, "#ec983c", "#ffea28",)
    ctx.strokeStyle = getGradient(ctx, "#ec983c", "#ffea28",)
    ctx.lineCap = "round"
    ctx.stroke();
    ctx.fill();
}

const getSamplePath = (selectedSample) => {
    const folder = samplesList.find(sg => selectedSample.type === sg.uid).path
    return `${process.env.PUBLIC_URL}/drums${folder}${selectedSample.sample}`
}

function WaveformCanvas({size, name = "OH/OH00.WAV"}) {
    const selectedSample = useRecoilValue(SelectedSample_)
    const volume = useRecoilValue(SelectedSampleVolume_)
    const pitch = useRecoilValue(SelectedSamplePitch_)
    const path = getSamplePath(selectedSample)
    const {width, height} = size
    const canvasRef = useRef(null)
    const samplerRef = useRef(null)
    const audioBufferRef = useRef(null)
    const note = Tone.Frequency("C4").transpose(pitch)

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")
        audioBufferRef.current = new Tone.ToneAudioBuffer(path,
            (buffer) => {
                const audioBuffer = buffer.get()
                const options = {
                    audio_buffer: audioBuffer,
                    scale: Math.floor(audioBuffer.length / width),
                    amplitude_scale: .8
                };

                WaveformData.createFromAudio(options, (err, waveform) => {
                    if (err) {
                        console.log(err);
                    } else {
                        drawWaveform(ctx, waveform, size)
                    }
                });

                samplerRef.current = new Tone.Sampler({"C4": buffer}).toDestination()
            })
    }, [path, width, size])
    return (
        <WaveformCanvasStyled ref={canvasRef}
                              width={width}
                              onClick={() => {
                                  if (samplerRef.current?.loaded) {
                                      samplerRef.current.triggerAttack(note, Tone.now(), volume / 100)
                                  }
                              }}
                              height={height}/>
    )
}

const CanvasWrapper = styled.div`
  position: relative;
  
  &:before {
    content: "";
    width: 100%;
    padding-bottom: 100%;
    display: block;
  }
`

const ModifierWrapper = styled.div`
  position: relative;
  padding-bottom: 20px;
`

const ModifierLabel = styled.div`
  position: absolute;
  white-space: nowrap;
  left: 50%;
  bottom: 0;
  font-size: 12px;
  transform: translateX(-50%);
  user-select: none;
`

function SampleModifierSections(props) {
    // eslint-disable-next-line
    const {label, useKnobState, size, min, max, step, bufferSize, middleAligned} = props
    const [state, setState] = useKnobState

    return (
        <ModifierWrapper>
            {middleAligned ?
                <MidpointGlowUpKnob setState={setState}
                                    state={state}
                                    {...props}/> :
                <GlowUpKnob setState={setState}
                            state={state}
                            {...props}/>}
            <ModifierLabel>
                {label} {state}
            </ModifierLabel>
        </ModifierWrapper>
    )
}

const SampleModifierWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 8px;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  padding: 8px;
`

function SampleModifier() {
    const [volume, setVolume] = useRecoilState(SelectedSampleVolume_)
    const [pitch, setPitch] = useRecoilState(SelectedSamplePitch_)

    return (
        <SampleModifierWrapper>
            <SampleModifierSections label={"Vol: "}
                                    useKnobState={[volume, setVolume]}
                                    size={MODIFIER_KNOB_SIZE}
                                    bufferSize={300}
                                    min={0}
                                    max={100}
                                    step={1}
            />
            <SampleModifierSections label={"Pitch: "}
                                    useKnobState={[pitch, setPitch]}
                                    bufferSize={300}
                                    size={MODIFIER_KNOB_SIZE}
                                    middleAligned={true}
                                    min={-12}
                                    max={12}
                                    step={1}
            />
        </SampleModifierWrapper>
    )
}

const ChangeSampleWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  left: 0;
  bottom: 0;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

function ChangeSample() {
    const samples = useRecoilValue(SampleList_)
    const [selectedSampleType, setSelectedSampleType] = useRecoilState(SelectedSampleType_)
    const [selectedSample, setSelectedSample] = useRecoilState(SelectedSampleFile_)
    const sampleFileList = samples.find(sg => sg.uid === selectedSampleType).samples

    return (
        <ChangeSampleWrapper>
            <select value={selectedSampleType} onChange={(e) => setSelectedSampleType(e.target.value)}>
                {samples.map(sampleGroup => {
                    return <option key={sampleGroup.path} value={sampleGroup.uid}>
                        {sampleGroup.title}
                    </option>
                })}
            </select>
            <select value={selectedSample} onChange={(e) => setSelectedSample(e.target.value)}>
                {sampleFileList.map(sample => {
                    return <option key={sample} value={sample}>
                        {sample}
                    </option>
                })}
            </select>
        </ChangeSampleWrapper>
    )
}

export function SampleSelector() {
    const wrapperRef = useRef(null)
    const size = useSize(wrapperRef)

    return (
        <CanvasWrapper ref={wrapperRef}>
            <SampleModifier/>
            {size && <WaveformCanvas size={size}/>}
            <ChangeSample/>
        </CanvasWrapper>
    )
}

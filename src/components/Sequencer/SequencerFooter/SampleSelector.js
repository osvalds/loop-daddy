import React, {useEffect, useRef, useState} from "react"
import styled from "styled-components"
import useSize from "../../../customHooks/useSize";
import * as Tone from "tone";
import WaveformData from "waveform-data";
import {Knob} from "../../Knob/Knob";

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

const SampleTime = styled.div`
  position: absolute;
  font-size: 14px;
  color: white;
  z-index: 1;
`

function WaveformCanvas({size, name = "808-bd14"}) {
    const {width, height} = size
    const canvasRef = useRef(null)
    const samplerRef = useRef(null)
    const audioBufferRef = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")

        audioBufferRef.current = new Tone.ToneAudioBuffer(`${process.env.PUBLIC_URL}/drums/808/${name}.wav`,
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
    }, [name, width, size])

    // console.log(samplerRef.current)
    return (
        <>
            <WaveformCanvasStyled ref={canvasRef}
                                  width={width}
                                  onClick={() => {
                                      if (samplerRef.current?.loaded) {
                                          samplerRef.current.triggerAttack("C4")
                                      }
                                  }}
                                  height={height}/>
            <SampleTime>{samplerRef.current?.sampleTime}</SampleTime>
        </>
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

const Ring = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient( rgba(254,158,11,1) 0%, rgba(252,70,107,1) 100%);
  left:0;
  top: 0;
  color: black;
  border-radius: 50%; 
`

const CAP_SIZE = 11

const LevelIndicator = styled.div`
  position: absolute;
  width: 10%;
  height: 25%;
  border-radius: 1px;
  background-color: white;
  top: ${CAP_SIZE}%;
  left: 50%;
  transform: translateX(-50%);
`

function GlowUpKnob({state, setState, size, bufferSize, min, max, step}) {
    return (
        <Knob
            value={state}
            onChange={setState}
            size={size}
            bufferSize={bufferSize}
            min={min}
            max={max}
            step={step}
        >
            <Ring>
                <LevelIndicator/>
            </Ring>
        </Knob>
    )
}

const ModifierWrapper = styled.div`
  position: relative;
  padding-bottom: 20px;
`

const ModifierLabel = styled.div`
  position: absolute;
  white-space: nowrap;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`

function SampleModifierSections(props) {
    const {label, useKnobState, size, min, max, step, bufferSize} = props
    const [state, setState] = useKnobState

    return (
        <ModifierWrapper>
            <GlowUpKnob setState={setState}
                        state={state}
                        {...props}/>
            <ModifierLabel>
                {label} {state}
            </ModifierLabel>
        </ModifierWrapper>
    )
}

const SampleModifierWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--base-background-color);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  padding: 8px;
`

const MODIFIER_KNOB_SIZE = 42

function SampleModifier() {
    const [volume, setVolume] = useState(80)
    const [pitch, setPitch] = useState(0)

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
                                    min={-12}
                                    max={12}
                                    step={1}
            />
        </SampleModifierWrapper>
    )
}

export function SampleSelector() {
    const wrapperRef = useRef(null)
    const size = useSize(wrapperRef)

    return (
        <CanvasWrapper ref={wrapperRef}>
            {size && <WaveformCanvas size={size}/>}
            <SampleModifier/>
        </CanvasWrapper>
    )
}

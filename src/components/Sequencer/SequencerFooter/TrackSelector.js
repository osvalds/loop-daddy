import React, {useEffect, useRef} from "react"
import styled from "styled-components"
import useSize from "../../../customHooks/useSize";
import * as Tone from "tone";
import WaveformData from "waveform-data";

const WaveformCanvasStyled = styled.canvas`
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

function WaveformCanvas({size, name = "808-bd14"}) {
    const {width, height} = size
    const canvasRef = useRef(null)
    const samplerRef = useRef(null)
    const sampleBuffer = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")

        sampleBuffer.current = new Tone.ToneAudioBuffer(`${process.env.PUBLIC_URL}/drums/808/${name}.wav`, (buffer) => {
            const audioBuffer = buffer.get()
            const options = {
                audio_buffer: audioBuffer,
                scale: Math.floor(audioBuffer.length / width),
                amplitude_scale: .8
            };

            WaveformData.createFromAudio(options, (err, waveform) => {
                console.log("callback")
                if (err) {
                    console.log(err);
                } else {
                    console.log(waveform.length)
                    drawWaveform(ctx, waveform, size)

                }
            });
        })
    }, [])

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d")
        ctx.fillStyle = "hsl(240,4%,9%)"
        ctx.fillRect(0, 0, width, height)
    }, [width, height])

    return (
        <WaveformCanvasStyled ref={canvasRef}
                              width={width}
                              onClick={() => samplerRef.current.triggerAttackRelease("C4")}
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


export function TrackSelector() {
    const wrapperRef = useRef(null)
    const size = useSize(wrapperRef)

    return (
        <CanvasWrapper ref={wrapperRef}>
            {size && <WaveformCanvas size={size}/>}
        </CanvasWrapper>
    )
}

import React, {useCallback, useEffect, useRef, useState} from "react"
import styled, {css, keyframes} from "styled-components"
import {ReactComponent as MetronomeIcon} from "./icons/metronome.svg";
import * as Tone from "tone"

const BORDER_RADIUS = 5;
const VERTICAL_PADDING = 8;

const metroZOOMIN = keyframes`
  from {
    transform: translateX(-50%) rotate(-30deg);
  }
  
  from {
    transform: translateX(-50%) rotate(30deg);
  }
`

const MetronomeButton = styled.button`
    border: none;
    padding: ${VERTICAL_PADDING}px 24px;
    background: hsl(240, 4%, 9%);
    border-radius: ${BORDER_RADIUS}px;
    position: relative;
 
    & > * {
        width: 24px !important;
        height: auto;
        fill: white;
        transition: .2s linear;
    }
    
    &:before {
        content: "";
        width: 3px;
        position: absolute;
        height: 24px;
        left: 50%;
        transform: translateX(-50%) rotate(-30deg);
        animation: ${metroZOOMIN} ${props => 60 / props.$bpm}s linear infinite alternate ;
        animation-play-state: ${props => props.$isRunning ? "running" : "paused"};
        transform-origin: bottom center;
        background-color: white;
        border-radius: 4px;
        bottom: ${VERTICAL_PADDING + 3}px;
        z-index: 1;
        mix-blend-mode: difference;
    }
`


export function Metronome() {
    const [isRunning, setIsRunning] = useState(false)
    const [bpm, setBpm] = useState(100)

    const HandleClick = useCallback(() => {
        if (isRunning) {
            setIsRunning(false)
            Tone.Transport.stop()
        } else {
            setIsRunning(true)
            Tone.Transport.start()
        }
    }, [isRunning, setIsRunning])

    const conga = useRef(null)
    const congaPart = useRef(null)


    useEffect(() => {
        conga.current = new Tone.MembraneSynth({
            pitchDecay: 0.008,
            octaves: 2,
            envelope: {
                attack: 0.0006,
                decay: 0.5,
                sustain: 0
            }
        }).toDestination()

        congaPart.current = new Tone.Sequence(((time, pitch) => {
            conga.current.triggerAttack(pitch, time, 1);
        }), ["G3", "C4", "C4", "C4"], "4n").start(0);
    }, [])

    useEffect(() => {
        Tone.Transport.bpm.value = bpm
    }, [bpm])


    return (
        <>
            <MetronomeButton $isRunning={isRunning}
                             onClick={HandleClick}
                             $bpm={bpm}>
                <MetronomeIcon/>
            </MetronomeButton>
        </>
    )
}

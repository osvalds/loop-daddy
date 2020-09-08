import React, {useState} from "react"
import styled, {css, keyframes} from "styled-components"
import {ReactComponent as MetronomeIcon} from "./icons/metronome.svg";

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
        animation: ${metroZOOMIN} 1s linear infinite alternate ;
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

    return (
        <MetronomeButton $isRunning={isRunning} onClick={() => setIsRunning(p => !p)}>
            <MetronomeIcon/>
        </MetronomeButton>
    )
}

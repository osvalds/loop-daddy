import {TextToInput} from "../../TextToInput";
import { useState } from "react";
import styled, {css, keyframes} from "styled-components"
import {ReactComponent as PlayIcon} from "./icons/play.svg";
import {ReactComponent as PauseIcon} from "./icons/pause.svg";
import {ReactComponent as RecordIcon} from "./icons/record.svg";
import {ReactComponent as StopIcon} from "./icons/stop.svg";
import {Metronome} from "./Metronome";
import {TransportProperties} from "./TransportProperties";

const BORDER_RADIUS = 8;

const ControlButton = styled.button`
  border: none;
  padding: 8px 24px;
  background: hsl(240, 4%, 9%);
  margin-right: 3px;
 
    &:first-child {
        border-top-left-radius: ${BORDER_RADIUS}px;
        border-bottom-left-radius: ${BORDER_RADIUS}px;
    }
    
    &:last-child {
      border-top-right-radius: ${BORDER_RADIUS}px;
      border-bottom-right-radius: ${BORDER_RADIUS}px;
      margin-right: 0;
    }
    
     & > * {
      
        width: 24px !important;
        height: auto;
        fill: white;
        transition: .2s linear;
    }
`

function TransportControlButton({onClick, children}) {
    return (
        <ControlButton onClick={onClick}>
            {children}
        </ControlButton>
    )
}

const ControlsWrapper = styled.div`
    margin: 0 auto 0 30px;
`

const cycleAnimation = keyframes`
  from {
   transform: scale(1.5)
  }
  
  to {
    transform: scale(0)
  }
`

const StyledRecordIcon = styled(RecordIcon)`
    circle.center {
      fill: red;
      transition: .1s linear;
      transform-origin: center;
    }
    .outer-ring {
      transition:  .1s linear;
    }
    
    ${props => props.$isRecording && css`
        circle.center {
          animation: ${cycleAnimation} 1s linear infinite alternate;
        }
        .outer-ring {
          fill: red;
        }
    `}  

`

function TransportControls() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    return (
        <ControlsWrapper>
            <TransportControlButton onClick={() => setIsPlaying(p => !p)}>
                {isPlaying ? <PauseIcon/> : <PlayIcon/>}
            </TransportControlButton>
            <TransportControlButton onClick={() => setIsPlaying(false)}>
                <StopIcon/>
            </TransportControlButton>
            <TransportControlButton onClick={() => setIsRecording(r => !r)}>
                <StyledRecordIcon $isRecording={isRecording}/>
            </TransportControlButton>
        </ControlsWrapper>
    )
}

const SequencerHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    margin-bottom: 12px;
    
`

export function SequencerHeader({useTrackTitle, useBpm, useSwing}) {
    return (
        <SequencerHeaderWrapper>
            <TextToInput useValue={useTrackTitle}/>
            <TransportControls/>
            <Metronome useBpm={useBpm}/>
            <TransportProperties useBpm={useBpm}
                                 useSwing={useSwing}/>
        </SequencerHeaderWrapper>
    )
}

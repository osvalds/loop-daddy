import { useState } from "react";
import {ReactComponent as MuteIcon} from "./SequencerHeader/icons/mute.svg";
import {ReactComponent as VolumeIcon} from "./SequencerHeader/icons/volume.svg";
import styled from "styled-components";

const TrackControlButton = styled.button`
  background-color: black;
  color: white;
  fill: white;
  border: 1px solid transparent;
  
  svg {
    width: 16px;
    height: auto;
    fill: white;
  }
`

const BeatButton = styled.button`
  border: 1px solid transparent;
  border-radius: 5px;
  
  &:nth-child(4n) {
    margin-right: 5px;
  }
  
  &:last-child {
      margin-right: 0;
  }
`

function ToggleMute() {
    const [isMuted, setIsMuted] = useState(false)

    return (
        <TrackControlButton onClick={() => setIsMuted(m => !m)}>
            {isMuted ? <VolumeIcon/> : <MuteIcon/>}
        </TrackControlButton>
    )
}

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const TRACK_GRID_TEMPLATE = "250px 1fr"

const TrackWrapper = styled.div`
  color: white;
  display: grid;
  grid-template-columns: ${TRACK_GRID_TEMPLATE};
`

const BeatWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 3px;
  grid-template-rows: 50px;
`

export function SequencerTrack() {
    const [title, setTitle] = useState("Kick 1")

    return (
        <TrackWrapper>
            <ControlsWrapper>
                <TrackControlButton>S</TrackControlButton>
                <ToggleMute/>
                <div>
                    Sick track name
                </div>
                <div>***</div>
            </ControlsWrapper>
            <BeatWrapper>
                {new Array(32).fill(0).map((el, i) =>
                    <BeatButton key={i}/>)}
            </BeatWrapper>
        </TrackWrapper>
    )
}

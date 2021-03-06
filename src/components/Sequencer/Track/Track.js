import styled from "styled-components";
import React, {useState} from "react";
import {ReactComponent as VolumeIcon} from "../SequencerHeader/icons/volume.svg";
import {ReactComponent as MuteIcon} from "../SequencerHeader/icons/mute.svg";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {NoteNewValueWhileDragging_} from "../Note.rcl";
import {NoteSelectorFamily_, Track_} from "../Sequencer.rcl";
import {PopoverMenu} from "./TrackMenu";

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

const NoteButton = styled.button.attrs(props => {
    const [darker, lighter] = props.$colors

    return {
        style: {
            background: props.$isActive ? `radial-gradient(circle, ${lighter} 25%, ${darker} 115%)` : darker
        }
    }
})`
  cursor:  pointer;
  border: 1px solid transparent;
  border-radius: 5px;
  
  &:focus {
    outline: none;
  }
  
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
const TRACK_GRID_GAP = 3

const TrackWrapper = styled.div`
  margin-bottom: ${TRACK_GRID_GAP}px;
  color: white;
  display: grid;
  grid-template-columns: ${TRACK_GRID_TEMPLATE};
`

const BeatWrapper = styled.div`
  user-select: none;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${TRACK_GRID_GAP}px;
  grid-template-rows: 50px;
`

function Note({colors, noteArr, onClick: setNote}) {
    // eslint-disable-next-line no-unused-vars
    const [volume, isActive, note, repeat, probability] = noteArr
    const [mouseDownValue, setMouseDownValue] = useRecoilState(NoteNewValueWhileDragging_)
    const resetMouseDown = useResetRecoilState(NoteNewValueWhileDragging_)

    return (
        <NoteButton $isActive={isActive}
            // onClick={() => }
                    onMouseDown={(e) => {
                        setNote(!isActive)
                        setMouseDownValue(!isActive)
                    }}
                    onMouseUp={resetMouseDown}
                    onMouseEnter={(e) => {
                        if (e.buttons === 1 || e.buttons === 3) {
                            setNote(mouseDownValue)
                        }
                    }}
                    $colors={colors}/>
    )
}

export function Track({uid}) {
    const {title, colors, notes} = useRecoilValue(Track_(uid))
    const setNote = useSetRecoilState(NoteSelectorFamily_(uid))

    const toggleNote = (idx, newVal) => {
        setNote([idx, newVal])
    }

    return (
        <TrackWrapper>
            <ControlsWrapper>
                <TrackControlButton>S</TrackControlButton>
                <ToggleMute/>
                <div>
                    {title}
                </div>
                <PopoverMenu/>
            </ControlsWrapper>
            <BeatWrapper>
                {notes.map((noteArr, index) => <Note key={`${uid}-${index}`}
                                                     onClick={(newVal) => toggleNote(index, newVal)}
                                                     noteArr={noteArr}
                                                     colors={colors}/>)}
            </BeatWrapper>
        </TrackWrapper>
    )
}

import {useState} from "react";
import {ReactComponent as MuteIcon} from "./SequencerHeader/icons/mute.svg";
import {ReactComponent as VolumeIcon} from "./SequencerHeader/icons/volume.svg";
import {useRecoilState, useSetRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import {NoteSelectorFamily_, Track_, TrackList_, Tracks_} from "./Sequencer.rcl";

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
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${TRACK_GRID_GAP}px;
  grid-template-rows: 50px;
`

function Note({colors, noteArr, onClick}) {
    const [volume, isActive, note, repeat, probability] = noteArr

    return (
        <NoteButton $isActive={isActive}
                    onClick={() => onClick(!isActive)}
                    $colors={colors}/>
    )
}

export function SequencerTrack({uid}) {
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
                <div>***</div>
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

const TracksWrapper = styled.div`
`

export function SequencerTracks() {
    const tracklist = useRecoilValue(TrackList_)

    return (
        <TracksWrapper>
            {tracklist.map(trackUID => <SequencerTrack key={trackUID} uid={trackUID}/>)}
        </TracksWrapper>
    )
}

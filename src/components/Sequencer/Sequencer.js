import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import * as Tone from "tone";
import {BORDER_RADIUS, ControlButton, SequencerHeader} from "./SequencerHeader/SequencerHeader";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {AddNewTrackSelector_, Loop_, TrackList_, Tracks_} from "./Sequencer.rcl";
import {H_PADDING, SequencerFooter} from "./SequencerFooter/SequencerFooter";
import {Track} from "./Track/Track";

// 1 -> q
// 2 -> q,w
// 3 -> q,w,e
// 4 -> q,w,a,s
// 5 -> q,w,e,a,s
// 6 -> q,w,e,a,s,d
// 7 -> q,w,e,r,a,s,d
// 8 -> q,w,e,a,s,d,z,x
// 9 -> q,w,e,a,s,d,z,x,c
const defaultKeyboardMap =
    {
        1: ["q"],
        2: ["q", "w"],
        3: ["q", "w", "e"],
        4: ["q", "w", "a", "s"],
        5: ["q", "w", "e", "a", "s"],
        6: ["q", "w", "e", "a", "s", "d"],
        7: ["q", "w", "e", "r", "a", "s", "d"],
        8: ["q", "w", "e", "a", "s", "d", "z", "x"],
        9: ["q", "w", "e", "a", "s", "d", "z", "x", "c"]
    }

const LaunchpadButton = styled.button`
  border-radius: 5px;
  border: none;
  background: radial-gradient(#ffea28, #ec983c);
  filter: ${props => props.isActive ? "hue-rotate(90deg)" : "hue-rotate(0)"}
`

// TILL THE DAY I DIE
function SoundSoundSound({name, keyboard}) {
    const [isActive, setIsActive] = useState(false)
    const toneRef = useRef(null)

    const onDown = useCallback(() => {
        setIsActive(true)
        toneRef.current.triggerAttackRelease("C4", "4n")
    }, [setIsActive])

    const handleKeyDown = useCallback((event) => {
        // this prevents multiple firings when key stays pressed
        if (event.repeat) {
            return
        }
        if (event.key === keyboard) {
            setIsActive(true)
            toneRef.current.triggerAttackRelease("C4", "4n")
        }
    }, [toneRef]);

    const handleKeyUp = useCallback((event) => {
        if (event.key === keyboard) {
            setIsActive(false)
        }
    }, [setIsActive])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        document.addEventListener("keyup", handleKeyUp, false);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, false)
            document.removeEventListener("keyup", handleKeyUp, false)
        };
    }, [handleKeyUp, handleKeyDown]);

    useEffect(() => {
        toneRef.current = new Tone.Sampler({
            urls: {
                C4: `${process.env.PUBLIC_URL}/drums/808/${name}.wav`
            }
        }).toDestination();
    }, [])

    return (
        <LaunchpadButton
            onMouseDown={onDown}
            onMouseUp={
                () => setIsActive(false)
            }
            // don't store the active state if mouse is dragged outside
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={onDown}
            isActive={isActive}
            onTouchEnd={e => {
                e.preventDefault()
                setIsActive(false)
            }}>
            {name} ({keyboard})
        </LaunchpadButton>
    )
}

const LaunchpadWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 12px;
    
    
    &::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
    
    & > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    } 
`


function Launchpad({samples}) {
    const keyMap = defaultKeyboardMap[samples.length]

    return (
        <LaunchpadWrapper>
            {samples.map((sampleName, index) => {
                return <SoundSoundSound key={sampleName}
                                        name={sampleName}
                                        keyboard={keyMap[index]}
                />
            })}
        </LaunchpadWrapper>
    );
}

const SequencerWrapper = styled.section`
  padding: 0 ${H_PADDING}px;
`

const AddTrack = styled(ControlButton)`
  color: white;
  width: 250px;
  margin: 0 0  12px 0;
  font-size: 16px;
  cursor: pointer;
  border-radius: ${BORDER_RADIUS}px;
`

const TracksWrapper = styled.div`
`


function SequencerTracks() {
    const trackList = useRecoilValue(TrackList_)

    return (
        <TracksWrapper>
            {trackList.map(trackUID => <Track key={trackUID} uid={trackUID}/>)}
        </TracksWrapper>
    )
}

export function Sequencer() {
    const samples = ["808-bd02", "808-bd14", "808-clap2", "808-cym01", "808-hh02", "808-sd03", "808-tme1"]
    // console.log(track)

    const addTrack = useSetRecoilState(AddNewTrackSelector_)

    return (
        <SequencerWrapper>
            {/*<Launchpad samples={samples}/>*/}
            <SequencerHeader/>
            <AddTrack onClick={addTrack}>
                Add new Track +
            </AddTrack>
            <SequencerTracks/>
            <SequencerFooter/>
        </SequencerWrapper>
    )
}

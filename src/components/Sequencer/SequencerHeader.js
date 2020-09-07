import {TextToInput} from "../TextToInput";
import React from "react";
import styled from "styled-components"

function TransportControlButton({onClick, children}) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )

}

function TransportControls() {
    return (
        <div>
            <TransportControlButton onClick={() => console.log("play")}>

            </TransportControlButton>
            <TransportControlButton onClick={() => console.log("stop")}>

            </TransportControlButton>
            <TransportControlButton onClick={() => console.log("recording")}>

            </TransportControlButton>
        </div>
    )

}

function Metronome() {
    return (
        "METRO BOOMIN"
    )
}

function TransportProperties() {
    return (
        ["BPM", "SWING"].map(i => <div key={i}>{i}</div>)
    )
}

const SequencerHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    
`

export function SequencerHeader({useTrackTitle, useBpm, useShuffle}) {
    return (
        <SequencerHeaderWrapper>
            <TextToInput useValue={useTrackTitle}/>
            <TransportControls/>
            <Metronome/>
            <TransportProperties/>
        </SequencerHeaderWrapper>
    )
}

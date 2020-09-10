import React from "react"
import styled from "styled-components"
import {TrackSelector} from "./TrackSelector";

export const H_PADDING = 24

const FooterWrapper = styled.section`
  border: 1px solid red;
  position: fixed;
  bottom: 0;
  left: ${H_PADDING}px;
  right: ${H_PADDING}px;
  display: grid;
  grid-template-columns: 250px 1fr;
`

function NoteControls() {
    return <div>Note Controls</div>
}

export function SequencerFooter() {
    return (
        <FooterWrapper>
            <TrackSelector/>
            <NoteControls/>
        </FooterWrapper>
    )
}

import React from 'react';
import styled from "styled-components";
import {useUnlockAudio} from "./customHooks/useUnlockListener";
import {Header} from "./components/Header/Header";
import {Sequencer} from "./components/Sequencer/Sequencer";

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  background-color: #242525;
  flex-direction: column;
`

function App() {
    useUnlockAudio();

    return (
        <ContentWrapper>
            <Header/>
            <Sequencer/>
        </ContentWrapper>
    );
}

export default App;

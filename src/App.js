import React from 'react';
import styled from "styled-components";
import {useUnlockAudio} from "./customHooks/useUnlockListener";
import {Header} from "./components/Header/Header";
import {Sequencer} from "./components/Sequencer/Sequencer";
import {RecoilRoot} from "recoil";

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  background-color: var(--base-background-color);
  flex-direction: column;
`

function App() {
    useUnlockAudio();

    return (
        <RecoilRoot>
            <ContentWrapper>
                <Header/>
                <Sequencer/>
            </ContentWrapper>
        </RecoilRoot>
    );
}

export default App;

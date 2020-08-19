import React, {useCallback, useState} from 'react';
import useSound from "use-sound";
import Hotkeys from "react-hot-keys"
import styled from "styled-components"

const LaunchpadButton = styled.button`
  border-radius: 5px;
  border: none;
  background: radial-gradient(#ffea28, #ec983c);
  filter: ${props => props.isActive ? "hue-rotate(90deg)" : "hue-rotate(0)"}
`


function SoundSoundSound({name, url, keyboard}) {
    const [play] = useSound(`${process.env.PUBLIC_URL + url}`, {interrupt: true})
    const [isActive, setIsActive] = useState(false)

    const onDown = useCallback(() => {
        setIsActive(true)
        play()
    }, [setIsActive, play])


    return (
        <Hotkeys keyName={keyboard}
                 onKeyDown={onDown}
                 onKeyUp={() => setIsActive(false)}
        >
            <LaunchpadButton
                onMouseDown={onDown}
                onMouseUp={
                    () => setIsActive(false)
                }
                onTouchStart={onDown}
                isActive={isActive}
                onTouchEnd={e => {
                    e.preventDefault()
                    setIsActive(false)
                }}>
                {name} ({keyboard})
            </LaunchpadButton>
        </Hotkeys>)

}

const sampleKit = [
    {name: "808-bd02.wav", url: "/drums/808/808-bd02.wav"},
    {name: "808-bd14.wav", url: "/drums/808/808-bd14.wav"},
    {name: "808-clap2.wav", url: "/drums/808/808-clap2.wav"},
    {name: "808-cym01.wav", url: "/drums/808/808-cym01.wav"},
    {name: "808-hh02.wav", url: "/drums/808/808-hh02.wav"},
    {name: "808-tme1.wav", url: "/drums/808/808-tme1.wav"}]

// 1 -> q
// 2 -> q,w
// 3 -> q,w,e
// 4 -> q,w,a,s
// 5 -> q,w,e,a,s
// 6 -> q,w,e,a,s,d
// 7 -> q,w,e,r,a,s,d
// 8 -> q,w,e,a,s,d,z,x
const defaultKeyboardMap =
    {
        1: ["q"],
        2: ["q", "w"],
        3: ["q", "w", "e"],
        4: ["q", "w", "a", "s"],
        5: ["q", "w", "e", "a", "s"],
        6: ["q", "w", "e", "a", "s", "d"],
        7: ["q", "w", "e", "r", "a", "s", "d"],
        8: ["q", "w", "e", "a", "s", "d", "z", "x"]
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
    } qw
`

function App() {
    return (
        <div className="App">
            <LaunchpadWrapper>
                {sampleKit.map((sample, index) => {
                    return <SoundSoundSound key={sample.name} {...sample}
                                            keyboard={defaultKeyboardMap[sampleKit.length][index]}/>
                })}
            </LaunchpadWrapper>
        </div>
    );
}

export default App;

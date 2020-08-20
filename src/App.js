import React, {useCallback, useEffect, useState} from 'react';
import useSound from "use-sound";
import styled from "styled-components"
import Sprite808 from "./drumkitSprites/808sprite.json"

const LaunchpadButton = styled.button`
  border-radius: 5px;
  border: none;
  background: radial-gradient(#ffea28, #ec983c);
  filter: ${props => props.isActive ? "hue-rotate(90deg)" : "hue-rotate(0)"}
`

function SoundSoundSound({onPlay, name, keyboard}) {
    const [isActive, setIsActive] = useState(false)

    const onDown = useCallback(() => {
        setIsActive(true)
        onPlay()
    }, [setIsActive, onPlay])

    return (
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
    )

}

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
    } 
`

const buildHowlerSpriteObj = (spriteMap) => {
    const spriteArray = Object.entries(spriteMap)
    const sprite = {}

    for (let [k, v] of spriteArray) {
        sprite[k] = [v.start * 1000, (v.end - v.start) * 1000]
    }

    return sprite;
}

function App() {
    const howlerSprite = buildHowlerSpriteObj(Sprite808.spritemap);
    const keyMap = defaultKeyboardMap[Object.keys(howlerSprite).length]
    const [play] = useSound(`${process.env.PUBLIC_URL}/drums/808/808sprite.mp3`, {sprite: howlerSprite})

    const handleSound = useCallback((event) => {
        const sampleIndex = keyMap.indexOf(event.key)
        const spriteId = Object.keys(howlerSprite)[sampleIndex]

        if (sampleIndex > -1) {
            play({id: spriteId})
        }
    }, [howlerSprite, keyMap, play]);

    useEffect(() => {
        document.addEventListener("keydown", handleSound, false);

        return () => {
            document.removeEventListener("keydown", handleSound, false)
        };
    }, [handleSound]);

    return (
        <div className="App">
            <LaunchpadWrapper>
                {Object.entries(howlerSprite).map(([k, v], index) => {
                    return <SoundSoundSound key={k}
                                            name={k}
                                            keyboard={keyMap[index]}
                                            onPlay={() => play({id: k})}
                    />
                })}
            </LaunchpadWrapper>
        </div>
    );
}

export default App;

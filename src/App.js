import React, {useCallback, useEffect, useState} from 'react';
import useSound from "use-sound";
import styled from "styled-components";
import Sprite808 from "./drumkitSprites/808sprite.json";
import Sprite909 from "./drumkitSprites/909sprite.json";
import SpriteRoland from "./drumkitSprites/rolandSprite.json";

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

const buildHowlerSpriteObj = (spriteMap) => {
    const spriteArray = Object.entries(spriteMap)
    const sprite = {}

    for (let [k, v] of spriteArray) {
        sprite[k] = [v.start * 1000, (v.end - v.start) * 1000]
    }

    return sprite;
}

const drumkits = {
    "808": {
        value: "808",
        url: "/drums/808/808sprite.mp3",
        title: "808 Drumset",
        sprite: buildHowlerSpriteObj(Sprite808.spritemap)
    },
    "909": {
        value: "909",
        url: "/drums/909/909sprite.mp3",
        title: "909 Drumset",
        sprite: buildHowlerSpriteObj(Sprite909.spritemap)
    },
    "roland": {
        value: "roland",
        url: "/drums/rolandtd7/rolandSprite.mp3",
        title: "Roland TD 7",
        sprite: buildHowlerSpriteObj(SpriteRoland.spritemap)
    }
}

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

function Launchpad({sprite, url}) {
    const keyMap = defaultKeyboardMap[Object.keys(sprite).length]
    const [play] = useSound(`${process.env.PUBLIC_URL}${url}`, {sprite})

    const handleSound = useCallback((event) => {
        const sampleIndex = keyMap.indexOf(event.key)
        const spriteId = Object.keys(sprite)[sampleIndex]

        if (sampleIndex > -1) {
            play({id: spriteId})
        }
    }, [sprite, keyMap, play]);

    useEffect(() => {
        document.addEventListener("keydown", handleSound, false);

        return () => {
            document.removeEventListener("keydown", handleSound, false)
        };
    }, [handleSound]);

    return (
        <LaunchpadWrapper>
            {Object.entries(sprite).map(([k, v], index) => {
                return <SoundSoundSound key={k}
                                        name={k}
                                        keyboard={keyMap[index]}
                                        onPlay={() => play({id: k})}
                />
            })}
        </LaunchpadWrapper>
    );
}

function App() {
    const [selectedKit, setSelectedKit] = useState("roland")

    return (
        <div className="App">
            <select value={selectedKit} onChange={(e) => setSelectedKit(e.target.value)}>
                {Object.entries(drumkits).map(([drumkitKey, drumkitConfig]) => {
                    return <option key={drumkitKey} value={drumkitKey}>{drumkitConfig.title}</option>
                })}
            </select>
            <Launchpad {...drumkits[selectedKit]}/>
        </div>
    );
}

export default App;

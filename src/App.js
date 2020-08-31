import React, {useCallback, useEffect, useState} from 'react';
import useSound from "use-sound";
import styled from "styled-components";
import Sprite808 from "./drumkitSprites/808sprite.json";
import Sprite909 from "./drumkitSprites/909sprite.json";
import SpriteRoland from "./drumkitSprites/rolandSprite.json";

import {Sequencer} from "./components/Sequencer";
import {getRandomColor} from "./Sugar";

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
        sprite[k] = {
            coords: [v.start * 1000, (v.end - v.start) * 1000],
            color: getRandomColor()
        }
    }

    return sprite;
}

const drumkits = {
    "808": {
        value: "808", url: "/drums/808/808sprite.mp3",
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

// TILL THE DAY I DIE
function SoundSoundSound({onPlay, name, keyboard, pressedKeys}) {
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
            // don't store the active state if mouse is dragged outside
            onMouseLeave={() => setIsActive(false)}
            onTouchStart={onDown}
            isActive={pressedKeys.has(keyboard) || isActive}
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

const LoopDaddyToUseSound = (sprite) => {
    const spriteArray = Object.entries(sprite)
    const s = {}

    for (let [k, v] of spriteArray) {
        s[k] = v.coords
    }

    return s;
}

function Launchpad({sprite, url}) {
    const keyMap = defaultKeyboardMap[Object.keys(sprite).length]
    // Sprite config must be an object like: {TIMPANI: [0, 350], PLINK: [450, 985.43]}
    console.log(sprite);
    const [play] = useSound(`${process.env.PUBLIC_URL}${url}`, {sprite: LoopDaddyToUseSound(sprite)})
    const [pressedKeys, setPressedKeys] = useState(new Set())

    const handleSound = useCallback((event) => {
        const sampleIndex = keyMap.indexOf(event.key)
        const spriteId = Object.keys(sprite)[sampleIndex]
        setPressedKeys(pkeys => {
            let newPkeys = new Set(pkeys)
            newPkeys.add(event.key)
            return newPkeys;
        })

        if (sampleIndex > -1) {
            play({id: spriteId})
        }
    }, [sprite, keyMap, play, setPressedKeys]);

    const handleKeyUp = useCallback((event) => {
        setPressedKeys(pkeys => {
            let newPkeys = new Set(pkeys)
            newPkeys.delete(event.key)
            return newPkeys
        })
    }, [setPressedKeys])

    useEffect(() => {
        document.addEventListener("keydown", handleSound, false);
        document.addEventListener("keyup", handleKeyUp, false);

        return () => {
            document.removeEventListener("keydown", handleSound, false)
            document.removeEventListener("keyup", handleKeyUp, false)
        };
    }, [handleSound, handleKeyUp]);

    return (
        <LaunchpadWrapper>
            {Object.entries(sprite).map(([k, v], index) => {
                return <SoundSoundSound key={k}
                                        name={k}
                                        pressedKeys={pressedKeys}
                                        keyboard={keyMap[index]}
                                        onPlay={() => play({id: k})}
                />
            })}
        </LaunchpadWrapper>
    );
}

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
    const [selectedKit, setSelectedKit] = useState("roland")

    return (
        <ContentWrapper>
            <select value={selectedKit} onChange={(e) => setSelectedKit(e.target.value)}>
                {Object.entries(drumkits).map(([drumkitKey, drumkitConfig]) => {
                    return <option key={drumkitKey} value={drumkitKey}>{drumkitConfig.title}</option>
                })}
            </select>
            <Launchpad {...drumkits[selectedKit]}/>
            <Sequencer {...drumkits[selectedKit]}/>
        </ContentWrapper>
    );
}

export default App;

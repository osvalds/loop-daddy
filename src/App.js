import React from 'react';
import useSound from "use-sound";
import useHotkeys from "@reecelucas/react-use-hotkeys";


function SoundSoundSound({name, url, keyboard}) {
    const [play] = useSound(`${process.env.PUBLIC_URL + url}`, {interrupt: true})
    useHotkeys(keyboard, play)


    return <button onClick={play}>
        {name} ({keyboard})
    </button>
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

function App() {
    return (
        <div className="App">
            {sampleKit.map((sample, index) => {
                return <SoundSoundSound key={sample.name} {...sample}
                                        keyboard={defaultKeyboardMap[sampleKit.length][index]}/>
            })}
        </div>
    );
}

export default App;

import {getRandomColor, uuidv4} from "../../Sugar";
import {atom} from "recoil";

export const TrackAtom = atom({
    key: "loopDaddyTrack",
    default: {
        bpm: 128,
        steps: 32,
        swing: 0,
        timeSignature: 4,
        title: "Untitled Unmastered",
        uid: uuidv4(),
        tracks: [
            {
                color: getRandomColor(),
                muted: false,
                name: "Kick 1",
                notes: [[0.8, true, "C4", 1, 100],
                    [0.8, true, "C4", 1, 100],
                    [0.8, true, "C4", 1, 100]],
                pitch: 0,
                sample: {
                    name: "kick-1",
                    uid: uuidv4()
                },
                uid: "6swrIRP9xQ-gypxEqVBcv",
                solo: false,
                volume: 0.8,
            }
        ],
    }
})

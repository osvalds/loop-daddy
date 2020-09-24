import {getRandomColor, uuidv4} from "../../Sugar";
import {atom, selector, selectorFamily} from "recoil";
import {SelectedSample_} from "./Samples/Samples.rcl";

export const Tracks_ = atom({
    key: "tracks",
    default: []
})

const getDefaultNotes = () => {
    return Array(32).fill([0.8, false, "C4", 1, 100])
}

const getEmptyTrack = (selectedSample) => {
    const {type, sample, volume, pitch} = selectedSample
    return {
        colors: getRandomColor(),
        muted: false,
        title: sample,
        notes: getDefaultNotes(),
        pitch: pitch,
        sample: selectedSample,
        uid: uuidv4(),
        solo: false,
        volume: volume,
    }

}

export const AddNewTrackSelector_ = selector({
    key: "addNewTrack",
    get: ({get}) => get(Tracks_),
    set: ({get, set}) => {
        const currentTracks = get(Tracks_)
        const selectedSample = get(SelectedSample_)
        const newTrack = getEmptyTrack(selectedSample)
        set(Tracks_, [...currentTracks, newTrack])
    }
})

export const Loop_ = atom({
    key: "loopDaddyTrack",
    default: {
        bpm: 128,
        steps: 32,
        swing: 0,
        timeSignature: 4,
        title: "Untitled Unmastered",
        uid: uuidv4(),
    }
})

export const LoopSelector_ = selectorFamily({
    key: "loopSelector",
    get: (k) => ({get}) => {
        return get(Loop_)[k]
    },
    set: (k) => ({get, set}, val) => {
        let loop = get(Loop_)
        set(Loop_, {...loop, [k]: val})
    }
})

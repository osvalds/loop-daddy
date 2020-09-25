import {getRandomColor, uuidv4} from "../../Sugar";
import {atom, selector, selectorFamily, atomFamily} from "recoil";
import {SelectedSample_} from "./Samples/Samples.rcl";

export const TrackList_ = atom({
    key: "trackList",
    default: []
})

export const Track_ = atomFamily({
    key: "track",
    default: null
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
    set: ({get, set}) => {
        const newTrack = getEmptyTrack(get(SelectedSample_))
        const trackList = get(TrackList_)

        set(TrackList_, [...trackList, newTrack.uid])
        set(Track_(newTrack.uid), newTrack)
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

export const LoopDataSelector_ = selectorFamily({
    key: "loopSelector",
    get: (k) => ({get}) => {
        return get(Loop_)[k]
    },
    set: (k) => ({get, set}, val) => {
        let loop = get(Loop_)
        set(Loop_, {...loop, [k]: val})
    }
})

export const NoteSelectorFamily_ = selectorFamily({
    key: "noteSelector",
    get: (k) => ({get}) => {

    },
    set: (trackUID) => ({get, set}, val) => {
        let track = {...get(Track_(trackUID))}
        const [noteIndex, newVal] = val
        // -------------------
        let newNotes = [...track.notes]
        let targetNote = [...newNotes[noteIndex]]

        targetNote[1] = newVal;
        newNotes[noteIndex] = targetNote
        track.notes = newNotes

        set(Track_(trackUID), track)
    }
})

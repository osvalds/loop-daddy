import {useEffect} from "react"
import * as Tone from "tone"

export function useUnlockAudio() {
    useEffect(() => {
        const unlock = async () => {
            await Tone.start()
            console.log("%c * Audio context is ready * ", "color: yellow; background: black;")
            removeUnlockEventListeners()
        }

        const removeUnlockEventListeners = () => {
            document.removeEventListener('touchstart', unlock, true)
            document.removeEventListener('touchend', unlock, true)
            document.removeEventListener('keydown', unlock, true)
            document.removeEventListener('click', unlock, true)
        }

        document.addEventListener('touchstart', unlock, true)
        document.addEventListener('touchend', unlock, true)
        document.addEventListener('keydown', unlock, true)
        document.addEventListener('click', unlock, true)

        return () => {
            removeUnlockEventListeners()
        }
    }, [])
}

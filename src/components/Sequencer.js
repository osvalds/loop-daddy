import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import useResizeObserver from "@react-hook/resize-observer";


const SequencerCanvas = styled.canvas `
    border: 1px solid red;
    flex: 1;
`

const drawCell = (ctx) => {
    ctx.fillStyle = 1 === 1 ? "#00adb5" : "#393e46";
    ctx.fillRect(0, 0,30, 30)

}

const useSize = (target) => {
    const [size, setSize] = React.useState()

    React.useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}

export function Sequencer() {
    const sequencerRef = useRef(null)
    const size = useSize(sequencerRef)

    useEffect(() => {
        const ctx = sequencerRef.current.getContext("2d")
        drawCell(ctx);
    }, [size?.width, size?.height])

    return <SequencerCanvas ref={sequencerRef}
                            width={size?.width}
                            height={size?.height}
    />
}

import { useState, useLayoutEffect } from "react";
import useResizeObserver from "@react-hook/resize-observer";

export default function useSize(target) {
    const [size, setSize] = useState(null)

    useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}

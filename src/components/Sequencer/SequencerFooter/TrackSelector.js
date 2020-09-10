import React, {useEffect, useRef} from "react"
import styled from "styled-components"
import useSize from "../../../customHooks/useSize";

const WaveformCanvasStyled = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

function WaveformCanvas({size}) {
    const {width, height} = size
    const canvasRef = useRef(null)

    console.log("pink", width, height)

    useEffect(() => {
        console.log("drawing", width, height);
        const ctx = canvasRef.current.getContext("2d")
        ctx.fillStyle = "pink"
        ctx.fillRect(0, 0, width, height)
    }, [width, height])

    return (
        <WaveformCanvasStyled ref={canvasRef}
                              width={width}
                              height={height}/>
    )
}

const CanvasWrapper = styled.div`
  position: relative;
  &:before {
    content: "";
    width: 100%;
    padding-bottom: 100%;
    display: block;
  }
`


export function TrackSelector() {
    const wrapperRef = useRef(null)
    const size = useSize(wrapperRef)

    console.log(size)

    return (
        <CanvasWrapper ref={wrapperRef}>
            {size && <WaveformCanvas size={size}/>}
        </CanvasWrapper>
    )
}

import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import useResizeObserver from "@react-hook/resize-observer";
import {mod} from "../Sugar";

const SCRUB_HEIGHT = 50

const BEAT_HEIGHT = 50
const BEAT_WIDTH = 40

const FULL_TIME_GAP = 20
const COLUMN_GAP = 10
const ROW_GAP = 8
const PAGE_SIZE = 32

const CONTROLS_WIDTH = 100

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}


const SequencerCanvas = styled.canvas`
    border: 1px solid red;
    flex: 1;
`

const drawTrackTitle = (ctx, title, x, y) => {
    ctx.font = "16px sans-serif";
    ctx.textBaseline = "middle"

    ctx.fillText(title,
        x + 1,
        Math.floor(y)
    )
}

const drawSampleTrack = (ctx, trackName, color, trackIndex) => {
    ctx.fillStyle = color;

    for (let beatIndex = 0; beatIndex < PAGE_SIZE; beatIndex++) {
        const TIME_GAP = FULL_TIME_GAP * Math.floor((beatIndex / 4))

        drawTrackTitle(ctx,
            trackName,
            0,
            SCRUB_HEIGHT + (trackIndex * BEAT_HEIGHT) + (trackIndex * ROW_GAP) + Math.floor(BEAT_HEIGHT / 2))
        roundRect(
            ctx,
            CONTROLS_WIDTH + (beatIndex * BEAT_WIDTH) + (beatIndex * COLUMN_GAP) + TIME_GAP,
            SCRUB_HEIGHT + (trackIndex * BEAT_HEIGHT) + (trackIndex * ROW_GAP),
            BEAT_WIDTH,
            BEAT_HEIGHT,
            5,
            true)
    }
}

const drawTracks = (ctx, sprite) => {
    let i = 0;

    for (let [name, v] of Object.entries(sprite)) {
        drawSampleTrack(ctx, name, v.color, i)
        i++;
    }
}

const useSize = (target) => {
    const [size, setSize] = React.useState(null)

    React.useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x, y}
}

function SequencerWrapper({size, sprite}) {
    const sequencerRef = useRef(null)
    const scale = window.devicePixelRatio;
    const {width, height} = size;
    const w = Math.floor(width * scale)
    const h = Math.floor(height * scale)

    useEffect(() => {
        const ctx = sequencerRef.current.getContext("2d")
        ctx.scale(scale, scale);
    }, [])

    useEffect(() => {
        const ctx = sequencerRef.current.getContext("2d")
        ctx.clearRect(0, 0, w, h)
        drawTracks(ctx, sprite)
    }, [w, h])

    const isInRange = (x, xmin, xmax) => {
        return xmin <= x && x <= xmax
    }

    const canvasClickCoordsToClickedBeat = (canvas, event) => {
        // relative cursor position to Canvas element
        const {x, y} = getCursorPosition(canvas, event);

        const fourBeatSectionWidth = ((4 * (BEAT_WIDTH + COLUMN_GAP)) + FULL_TIME_GAP)

        const trackHeight = BEAT_HEIGHT + ROW_GAP

        // Transform click position to where tracks are rendered
        const cX0 = x - CONTROLS_WIDTH;
        const cY0 = y - SCRUB_HEIGHT;

        if (cX0 < 0 || cY0 < 0) {
            return null
        }

        // get which subgrid was clicked on
        const subgridX = Math.floor(cX0 / fourBeatSectionWidth)
        // get which box in the subgrid was clicked on, capping at 3 so there are no weird overflowing things
        const positionInSubgrid = Math.min(Math.floor(mod(cX0, fourBeatSectionWidth)/ (BEAT_WIDTH + COLUMN_GAP)), 3)
        // this is the potential coords for the clicked box but we want to check if the user
        // hasn't clicked/dragged on a space around the box (which are included in the calculations)
        const proposedX = subgridX * 4 + positionInSubgrid;
        // it's much simpler for the Y dimension
        const proposedY = Math.floor(cY0 / trackHeight)


        // Validate if proposed index matches with how the boxes are drawn on the screen
        // If the click position matches with the position of where boxes are being drawn,
        // return the proposed position
        const x0 = CONTROLS_WIDTH + (proposedX * BEAT_WIDTH) + (proposedX * COLUMN_GAP) + FULL_TIME_GAP * subgridX
        const y0 = SCRUB_HEIGHT + (proposedY * BEAT_HEIGHT) + (proposedY * ROW_GAP)
        if (isInRange(x, x0, x0 + BEAT_WIDTH) &&
            isInRange(y, y0, y0 + BEAT_HEIGHT)) {
            return [proposedX, proposedY]
        } else {
            return null
        }
    }

    return <SequencerCanvas ref={sequencerRef}
                            style={{
                                width: Math.floor(width),
                                height: Math.floor(height)
                            }}
                            onClick={(e) => {
                                console.log(canvasClickCoordsToClickedBeat(sequencerRef.current, e))
                                // console.log(getCursorPosition(sequencerRef.current, e))
                            }}
                            onMouseMove={(e) => {
                                if (e.buttons === 1) {
                                    console.log(canvasClickCoordsToClickedBeat(sequencerRef.current, e))
                                }
                            }}
                            width={w}
                            height={h}
    />
}

export function Sequencer(props) {
    const wrapperRef = useRef(null)
    const size = useSize(wrapperRef)
    const [sequence, setSequence] = useState(Array(PAGE_SIZE).fill([]))

    return <CanvasWrapper ref={wrapperRef}>
        {size &&
        <SequencerWrapper size={size} {...props}/>
        }
    </CanvasWrapper>

}

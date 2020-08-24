import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import useResizeObserver from "@react-hook/resize-observer";
import {get_random_color} from "../Sugar";

const SCRUB_HEIGHT = 50

const BEAT_HEIGHT = 50
const BEAT_WIDTH = 40

const FULL_TIME_GAP = 4
const COLUMN_GAP = 3
const ROW_GAP = 5
const PAGE_SIZE = 16

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

    for (let name of Object.keys(sprite)) {
        let color = get_random_color()
        drawSampleTrack(ctx, name, color, i)
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

    return <SequencerCanvas ref={sequencerRef}
                            style={{
                                width: Math.floor(width),
                                height: Math.floor(height)
                            }}
                            width={w}
                            height={h}
    />
}

export function Sequencer(props) {
    const wrapperRef = useRef(null)
    const size = useSize(wrapperRef)

    return <CanvasWrapper ref={wrapperRef}>
        {size &&
        <SequencerWrapper size={size} {...props}/>
        }
    </CanvasWrapper>

}

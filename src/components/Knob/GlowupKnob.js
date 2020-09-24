import styled from "styled-components";
import {getNormalizedValue, Knob} from "./Knob";

const CAP_SIZE = 11
export const MODIFIER_KNOB_SIZE = 24;
const MARKING_COUNT = (midAligned = false) => midAligned ? 21 : 20;
const MARKING_DISTANCE = 2

const Ring = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient( rgba(254,158,11,1) 0%, rgba(252,70,107,1) 100%);
  left:0;
  top: 0;
  color: black;
  border-radius: 50%; 
`

const LevelIndicator = styled.div`
  position: absolute;
  width: 10%;
  height: 25%;
  border-radius: 1px;
  background-color: white;
  top: ${CAP_SIZE}%;
  left: 50%;
  transform: translateX(-50%);
`

const KnobWrapper = styled.div`
  cursor: pointer;
  position: relative;
`

const ValueMarkings = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Mark = styled.div.attrs(props => {
    return {
        style: {
            width: `${props.$width}%`,
            transform: `translateX(-50%) translateY(-50%) rotate(${props.$rotate + 180}deg) translateY(${MODIFIER_KNOB_SIZE - 7}px)`
        }
    }
})`
        position: absolute;
        height: 20%;
        transition: .1s linear;
        background: ${props => props.$active ? "#fc466b" : "#c7c7c7"};
        box-shadow:  ${props => props.$active ? "1px 1px 10px 0px #fc466b" : "1px 1px 10px 0px #c7c7c7"};
        top: 50%;
        left: 50%;
        z-index: 4;
`

const PreMark = styled(Mark)`
  background: ${props => props.$active ? "#468ffc" : "#c7c7c7"};
  box-shadow:  ${props => props.$active ? "1px 1px 10px 0px #468ffc" : "1px 1px 10px 0px #c7c7c7"};
`
const MidMark = styled(Mark)`
  background: ${props => props.$backgroundColor};
  box-shadow:  ${props => `1px 1px 10px 0px ${props.$backgroundColor}`};
`

/*
* *****, wrist for wrist—let's have a glow-off
* Fuck it, brick for brick—let's have a blow-off
* -- Pusha T, Come Back Baby
* */

export function GlowUpKnob({state, setState, size, bufferSize, min, max, step}) {
    const markingCount = MARKING_COUNT()
    const markings = Array(markingCount).fill(0)
    const p = Math.PI * 100
    const markWidth = bufferSize / 360 * p / markingCount
    const normalizedStateValue = getNormalizedValue(state, min, max - 1)

    return (
        <KnobWrapper>
            <ValueMarkings>
                {markings.map((item, idx) => {
                    const marksNormalizedValue = getNormalizedValue(idx, 0, markingCount - 1)
                    const rotationAmount = marksNormalizedValue * bufferSize - bufferSize / 2;

                    return <Mark key={idx}
                                 $width={markWidth - MARKING_DISTANCE}
                                 $active={marksNormalizedValue < normalizedStateValue}
                                 $rotate={rotationAmount}
                                 $distance={MARKING_DISTANCE}/>
                })}
            </ValueMarkings>
            <Knob
                value={state}
                onChange={setState}
                size={size}
                bufferSize={bufferSize}
                min={min}
                max={max}
                step={step}
            >
                <Ring>
                    <LevelIndicator/>
                </Ring>
            </Knob>
        </KnobWrapper>
    )
}


export function MidpointGlowUpKnob({state, setState, size, bufferSize, min, max, step}) {
    const markingCount = MARKING_COUNT(true)
    const markings = Array(markingCount).fill(0)
    const p = Math.PI * 100
    const markWidth = bufferSize / 360 * p / markingCount
    const normalizedStateValue = getNormalizedValue(state, min, max)

    const stateMidPoint = Math.floor((min + max) / 2)
    const markingMidPoint = Math.ceil(markingCount / 2)

    const getMidColor = () => {
        if (state < stateMidPoint) {
            return "#468ffc"
        } else if (state > stateMidPoint) {
            return "#fc466b"
        } else {
            return "#6bfc46"
        }
    }

    return (
        <KnobWrapper>
            <ValueMarkings>
                {markings.map((item, idx) => {
                    const marksNormalizedValue = getNormalizedValue(idx, 0, markingCount - 1)
                    const rotationAmount = marksNormalizedValue * bufferSize - bufferSize / 2;

                    if (idx < markingMidPoint - 1) {
                        return <PreMark key={idx}
                                        $width={markWidth - MARKING_DISTANCE}
                                        $active={marksNormalizedValue >= normalizedStateValue}
                                        $rotate={rotationAmount}
                                        $distance={MARKING_DISTANCE}/>

                    } else if (idx > markingMidPoint - 1) {
                        return <Mark key={idx}
                                     $width={markWidth - MARKING_DISTANCE}
                                     $active={marksNormalizedValue <= normalizedStateValue}
                                     $rotate={rotationAmount}
                                     $distance={MARKING_DISTANCE}/>

                    } else {
                        return <MidMark key={idx}
                                        $width={markWidth - MARKING_DISTANCE}
                                        $backgroundColor={getMidColor()}
                                        $rotate={rotationAmount}
                                        $distance={MARKING_DISTANCE}/>
                    }
                })}
            </ValueMarkings>
            <Knob
                value={state}
                onChange={setState}
                size={size}
                bufferSize={bufferSize}
                min={min}
                max={max}
                step={step}
            >
                <Ring>
                    <LevelIndicator/>
                </Ring>
            </Knob>
        </KnobWrapper>
    )
}

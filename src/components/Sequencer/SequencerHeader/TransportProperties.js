import {StyledInput, TextToInput} from "../../TextToInput";
import styled from "styled-components"

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  
  ${StyledInput} {
    margin-left: 12px;
    min-width: 40px;
    width: 50px;
  }
  
  &:last-child {
    margin-right: 0;
  }
`

const StyledTransportProperties = styled.div`
  display: flex;
  align-items: center;
`

export function TransportProperties({useBpm: useBPM, useSwing}) {

    return (
        <StyledTransportProperties>
            <InputWrapper>
                <TextToInput useValue={useBPM}
                             id={"bpm"}
                             label="BPM:"
                             min={40}
                             max={260}
                             type="number"/>
            </InputWrapper>
            <InputWrapper>
                <TextToInput useValue={useSwing}
                             id={"swing"}
                             min={0}
                             max={100}
                             label="Swing:"
                             type="number"/>
            </InputWrapper>
        </StyledTransportProperties>
    )
}

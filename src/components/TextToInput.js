import React from "react";
import styled, {css} from "styled-components"

const sharedInputStyle = css`
  font-weight: bold;
  color: white;
  font-size: 16px;
  padding: 0;
  margin: 0; 
`

export const StyledInput = styled.input`
  background-color: transparent;
  -webkit-appearance: none;
  
  border: 1px solid transparent;
  min-width: 180px;
  max-width: 300px;
  width: 100%;
  ${sharedInputStyle}
  
  &:focus {
    border: 1px solid #e2e8f0; 
  }
`

const StyledLabel = styled.label`
  ${sharedInputStyle}
`

export function TextToInput({useValue, type, label, id}) {
    const [value, setValue] = useValue

    return (
        <>
            {label && id && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
            <StyledInput
                id={id}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}/>
        </>

    )
}

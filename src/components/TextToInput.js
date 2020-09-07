import React, {useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components"

const sharedInputStyle = css`
  font-weight: bold;
  color: white;
  font-size: 16px;
  padding: 0;
  margin: 0;
  min-width: 180px;
  max-width: 300px;
  width: 100%;
`

const StyledInput = styled.input`
  background-color: transparent;
  -webkit-appearance: none;
  
  border: 1px solid transparent;
  ${sharedInputStyle}
  
  &:focus {
    border: 1px solid #e2e8f0; 
  }
`

function Input({useValue}) {
    const [value, setValue] = useValue

    return (
        <StyledInput
            value={value}
            onChange={(e) => setValue(e.target.value)}/>
    )
}

export function TextToInput({useValue}) {
    return (
        <Input useValue={useValue}/>
    )
}

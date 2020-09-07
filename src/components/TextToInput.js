import React, {useEffect, useRef, useState} from "react";

function Input({useValue, setIsActive}) {
    const [value, setValue] = useValue
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return <input ref={inputRef}
                  value={value}
                  onBlur={() => setIsActive(false)}
                  onKeyDown={(e) => {
                      if (e.key === "Escape") {
                          setIsActive(false)
                      }
                  }}
                  onChange={(e) => setValue(e.target.value)}/>
}

function Title({setIsActive, children}) {


    return (
        <div onClick={() => setIsActive(true)}>
            {children}
        </div>
    )
}

export function TextToInput({useValue}) {
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useValue

    return (
        <div>
            {isActive ?
                <Input useValue={useValue}
                       setIsActive={setIsActive}/> :
                <Title setIsActive={setIsActive}>
                    {value}
                </Title>}
        </div>
    )
}

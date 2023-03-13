import { useState } from "react"

export const useCastom = () => {
    const [stateA, setStateA] = useState(0)
    const increment = () => {
        setStateA(stateA + 1)
    }
    return {

        stateA,
        increment
    }
    
}

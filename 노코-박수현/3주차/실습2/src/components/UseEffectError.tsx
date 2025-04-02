import { useEffect, useState } from "react";

export default function UseEffectError() {
    const [counter, setCounter] = useState(0);

    const handleIncrease = (): void => {
        setCounter((counter): number => counter + 1);
    }
    useEffect((): void => { 
        setCounter((counter): number => counter + 1);
    }, [] )
    return <div onClick={handleIncrease}>UseEffectError</div>;
}
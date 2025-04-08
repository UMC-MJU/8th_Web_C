import { useEffect, useState } from "react"

export default function UseEffectPage() {
    const [count, SetCount] = useState(0);

    const handleIncrease = (): void => {
        SetCount((prev): number => prev + 1);
    }

    useEffect((): void => {
        // 실행
        console.log(count);

        // return function (optional)

        // clean up function
        return (): void => {
            console.log('clean up function');
        };

        // 의존성 배열
    }, [count]); // 빈 배열은 처음 1번만 랜더링

    return (
        <div>
            <h3>UseEffectPage</h3>
            <h1>{count}</h1>
            <button onClick={handleIncrease}>증가</button>
        </div>
    )
}

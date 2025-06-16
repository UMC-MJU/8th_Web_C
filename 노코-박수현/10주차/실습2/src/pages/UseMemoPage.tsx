import { useMemo, useState } from "react"
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

const UseMemoPage = () => {
    console.log('render')

    const [limit, setLimit] = useState(10000);
    const [text, setText] = useState('');

    const handleChangeText = (text: string): void => {
        setText(text);
    }

    const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

    return (
        <div className="flex flex-col gap-4 h-dvh">
            <h1>
                useMemo
            </h1>
            <label>
                숫자 입력:
                <input
                    type='number'
                    value={limit}
                    className="border p-4 rounded-lg"
                    onChange={(e): void => setLimit(Number(e.target.value))}
                />
            </label>
            <h2>소수 리스트:</h2>
            <div className="flex flex-wrap gap-2">
                {primes.map((prime) => (
                    <div key={prime}>{prime}</div>
                ))}
            </div>
            <label>
                {text}
                다른 입력 테스트: <TextInput onChange={handleChangeText} />
            </label>
        </div>
    )
}

export default UseMemoPage

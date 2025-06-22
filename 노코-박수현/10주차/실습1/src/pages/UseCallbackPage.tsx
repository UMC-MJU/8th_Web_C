import { useCallback, useState } from "react"
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

const UseCallbackPage = () => {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>('');

    const handleIncreaseCount = useCallback((number: number): void => {
        setCount(count + number);
    }, [count]);

    const handleText = useCallback((text: string): void => {
        setText(text);
    }, []);

    return (
        <div>
            <h1>useCallback</h1>
            <h2>Count: {count}</h2>
            <CountButton onClick={handleIncreaseCount} />
            <h2>Text</h2>
            <span>{text}</span>
            <div className="flex flex-col">
                <TextInput onChange={handleText} />
            </div>
        </div>
    )
}

export default UseCallbackPage

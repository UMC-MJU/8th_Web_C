import { memo } from "react";


interface ICountButton {
    onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
    console.log("CountButton Renderer");
    return (
        <button className="border p-2 rounded-lg" onClick={(): void => onClick(10)}>카운트 증가</button>
    )
}

export default memo(CountButton)

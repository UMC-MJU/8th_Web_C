interface ITextInput {
    onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
    console.log("TextInput Renderer");
    return (
        <input
            type="text"
            className="border p-2 rounded-lg"
            onChange={(e): void => onChange(e.target.value)}
        />
    )
}

export default TextInput
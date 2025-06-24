interface LanguageOption {
    value: string;
    label: string;
}

interface LanguageSelectorProps {
    value: string;
    onChange: (value: string) => void;
    options: LanguageOption[];
    className?: string;
}

const LanguageSelector = ({
    value,
    onChange,
    options,
    className = "",
}: LanguageSelectorProps): React.ReactElement => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default LanguageSelector

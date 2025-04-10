import { useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValues: T; // {email: string; password: string;}
    // 값이 올바른지 검사하는 함수
    validate: (values: T) => Record<keyof T, string>;
}

export default function useForm<T>({initialValues, validate} : UseFormProps<T>) {
    const [values, setValues] = useState(initialValues); 
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>();
    
    //사용자 입력 값이 바뀔 때마다 호출되는 함수
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, // 불변성 유지
            [name]: text
        })
    };
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true
        });
    }
    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            handleChange(name, e.target.value);
        };

        const onBlur = () => {
            handleBlur(name);
        }

        return {
            value,
            onChange,
            onBlur,
        };
    };
    useEffect(() => {
            const errors = validate(values);
            setErrors(errors);
        }
        , [validate, values]);
    return {
        values, errors, touched, getInputProps
    };
};
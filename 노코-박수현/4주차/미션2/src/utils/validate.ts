export type userSinginInformation = {
    email: string;
    password: string;
}

function validateUser(values: userSinginInformation) {
    const errors = {
        email: "",
        password: ""
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
        errors.email = "이메일 형식이 아닙니다.";
    }
    if(!(values.password.length > 8 && values.password.length < 20)) {
        errors.password = "비밀번호는 8자~20자 사이를 입력하셔야 합니다.";
    }
    return errors;
}

export function validateSignin(values: userSinginInformation) {
    return validateUser(values);
}

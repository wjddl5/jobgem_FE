import axios from "axios";

export async function login(formdata) {
    const API_URL = "/api/login"
    
    const result = axios.post(API_URL, {
        email: formdata.email,
        password: formdata.password
    })
    
    switch ((await result).status) {
        case 200:
            return "로그인 성공"
            break;
        case 208:
            return "이메일이 존재하지 않습니다."
            break;
        case 209:
            return "비밀번호를 확인해주세요."
            break;
        default:
            return "서버 문제 발생"
            break;
    }
}

export async function personalJoin(formdata) {
    const API_URL = "/api/join"
    
    const result = axios.post(API_URL, {
        email: formdata.email,
        password: formdata.password
    })
    
    switch ((await result).status) {
        case 200:
            return "로그인 성공"
            break;
        case 208:
            return "이메일이 존재하지 않습니다."
            break;
        case 209:
            return "비밀번호를 확인해주세요."
            break;
        default:
            return "서버 문제 발생"
            break;
    }
}

export async function companyJoin(formdata) {
    const API_URL = "/api/join"
    
    const result = axios.post(API_URL, {
        email: formdata.email,
        password: formdata.password
    })
    
    switch ((await result).status) {
        case 200:
            return "로그인 성공"
            break;
        case 208:
            return "이메일이 존재하지 않습니다."
            break;
        case 209:
            return "비밀번호를 확인해주세요."
            break;
        default:
            return "서버 문제 발생"
            break;
    }
}
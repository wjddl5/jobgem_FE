import axios from "axios";

export async function loginAction(formdata) {
    const API_URL = "/api/login"
    try {
        const result = axios.post(API_URL, {
            usId: formdata.email,
            usPw: formdata.password
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
    } catch (error) {
        return "통신이 원활하지 않습니다."
    }
}


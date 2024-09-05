import axios from "axios";

export async function login(formdata) {
    const API_URL = "/api/login"

    const result = axios.post(API_URL, {
        usId: formdata.usId,
        usPw: formdata.usPw
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
    const API_URL = "/api/join/jobseeker"
    
    const result = axios.post(API_URL, {
        user: {
            usId: formdata.usId,
            usPw: formdata.usPw,
        },
        jobseeker: {
            joName: formdata.joName,
            joTel: formdata.joTel,
            joGender: "M"
        }
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
    const API_URL = "/api/join/company"
    
    const result = axios.post(API_URL, {
        user: {
            usId: formdata.usId,
            usPw: formdata.usPw,
        },
        company: {
            coName: formdata.coName,
            coAddress: formdata.coAddress,
            coTel: formdata.coTel,
            coNumber: formdata.coNumber,
            coType: formdata.coType,
            coManagerName: formdata.coManagerName,
            coManagerTel: formdata.coManagerTel
        }
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
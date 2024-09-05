import axios from "axios";

export async function personalJoin(formdata) {
    const API_URL = "/api/join/jobseeker"
    try {
        const result = axios.post(API_URL, {
            user: {
                usId: formdata.email,
                usPw: formdata.password,
            },
            jobseeker: {
                joName: formdata.name,
                joTel: formdata.tel,
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
                return "통신이 원활하지 않습니다."
                break;
        }
    } catch (error) {
        return "통신이 원활하지 않습니다."
    }
}

export async function companyJoin(formdata) {
    const API_URL = "/api/join/company"

    try {
        const result = axios.post(API_URL, {
            user: {
                usId: formdata.email,
                usPw: formdata.password,
            },
            company: {
                coName: formdata.name,
                coAddress: formdata.address,
                coTel: formdata.tel,
                coNumber: formdata.number,
                coType: formdata.type,
                coManagerName: formdata.managerName,
                coManagerTel: formdata.managerTel
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
    } catch (error) {
        return "통신이 원활하지 않습니다."
    }
}
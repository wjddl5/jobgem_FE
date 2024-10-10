import axios from "axios";

export async function emailCheck(email) {
    const API_URL = "/api/join/check/email"
    try {
        const result = axios.get(API_URL, {
            params: {
                email: email
            }
        })
        if ((await result).status === 200) {
            return (await result).data;
        }
    } catch (error) {
        return "통신이 원활하지 않습니다."
    }
}

export async function personalJoin(formdata) {
    const API_URL = "/api/join/jobseeker"
    if (formdata.password === formdata.rePassword) {
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
                case 201:
                    return "회원가입 성공"
                    break;
                default:
                    return "통신이 원활하지 않습니다."
                    break;
            }
        } catch (error) {
            return "통신이 원활하지 않습니다."
        }
    } else {
        return "비밀번호가 다릅니다."
    }
}

export async function companyJoin(formdata) {
    const API_URL = "/api/join/company"
    if (formdata.password === formdata.rePassword) {
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
                case 201:
                    return "회원가입 성공"
                    break;
                default:
                    return "서버 문제 발생"
                    break;
            }
        } catch (error) {
            return "통신이 원활하지 않습니다."
        }
    } else {
        return "비밀번호가 다릅니다."
    }
}
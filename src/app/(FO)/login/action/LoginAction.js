import axios from "axios";

export async function loginAction(formdata) {
    const API_URL = "/api/login"
    try {
        const result = await axios.post(API_URL, {
            usId: formdata.email,
            usPw: formdata.password
        })
        switch (result.status) {
            case 200:
                return "로그인 성공"
                break;
        }
    } catch (error) {
        console.log(error.response.status);
        if(error.response.status == "400") {
            return "아이디 혹은 비밀번호가 일치하지 않습니다."
        }
        return "통신이 원활하지 않습니다."
    }
}


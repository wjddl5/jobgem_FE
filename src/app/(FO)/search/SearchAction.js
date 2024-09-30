import axios from "axios";

export async function searchAction(keyword, curPage = 0) {
    const API_URL = "http://localhost:8080/api/posts/search"

    try {
        const result = await axios.get(API_URL, {
            params: {
                keyword: keyword,
                curPage: curPage
            }
        })
        return result.data;
    } catch (error) {
        return "통신이 원활하지 않습니다."
    }
}

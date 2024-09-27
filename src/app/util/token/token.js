import axios from "axios";

export async function getToken() {
    try{
        const res = await axios.get('/util/token')
        return res.data;
    } catch (error) {
        console.error("Failed to fetch token:", error);
    }
}

import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const updateUser = async (username: string, email: string) => {
    const URL = baseUrl + 'api/user/update'
    try {
        const response = await axios.patch(URL, { username, email })
        return (response.status === 200 ? response.data : null)
    } catch (error) {
        return false
    }
}
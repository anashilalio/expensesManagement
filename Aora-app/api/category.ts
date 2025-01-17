import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addCategoryToDB = async (name: string, color: string) => {
    const URL = baseUrl + 'api/category/add'
    try {
        const response = await axios.post(URL, {name, color})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}
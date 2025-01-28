import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addPersonalCategoryToDB = async (name: string, color: string) => {
    const URL = baseUrl + 'api/category/add'
    try {
        const response = await axios.post(URL, {name, color})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}

export const addCommunityCategoryToDB = async (communityCode:string, name: string, color: string) => {
    const URL = baseUrl + 'api/community/category/add'
    try {
        const response = await axios.post(URL, {communityCode, name, color})
        console.log(response);
        
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}

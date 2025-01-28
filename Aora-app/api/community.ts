import { CommnunityType } from "@/types/types";
import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addCommunityToDB = async (community: CommnunityType) => {
    const URL = baseUrl + 'api/community/create'
    try {
        const response = await axios.post(URL, {...community})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}
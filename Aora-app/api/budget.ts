import { BudgetType, CommunityBudgetType } from "@/types/types";
import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addPersonalBudgetToDB = async (budget: BudgetType) => {
    const URL = baseUrl + 'api/budget/add'
    try {
        const response = await axios.post(URL, {...budget})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}
export const addCommunityBudgetToDB = async (communityBudget: CommunityBudgetType) => {
    const URL = baseUrl + 'api/community/budget/add'
    try {
        const response = await axios.post(URL, {...communityBudget})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}
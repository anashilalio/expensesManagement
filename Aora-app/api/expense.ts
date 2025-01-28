import { CommunityExpenseType, ExpenseType } from "@/types/types";
import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addPersonalExpenseToDB = async (expense: ExpenseType) => {
    const URL = baseUrl + 'api/expense/add'
    try {
        const response = await axios.post(URL, {...expense})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}

export const addCommunityExpenseToDB = async (communityExpense: CommunityExpenseType) => {
    const URL = baseUrl + 'api/community/expense/add'
    try {
        const response = await axios.post(URL, {...communityExpense})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}
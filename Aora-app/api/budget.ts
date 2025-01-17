import { BudgetType } from "@/types/types";
import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addBudgetToDB = async (budget: BudgetType) => {
    const URL = baseUrl + 'api/budget/add'
    try {
        const response = await axios.post(URL, {...budget})
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}
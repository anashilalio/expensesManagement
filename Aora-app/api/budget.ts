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

export const updateAmountPersonalBudgetInDB =async (category: string, amount: number) => {    
    const URL = baseUrl + 'api/budget/appendToCurrent'
    try {
        const response = await axios.patch(URL, {category, amount})
        console.log(response.status);
        
        return (response.status === 200 ? response.data : null)
    } catch (error) {
        return false
    }
}

export const updateMaxPersonalBudgetInDB =async (category: string, max: number) => {    
    const URL = baseUrl + 'api/budget/updateMax'
    try {
        const response = await axios.patch(URL, {category, amount: max})
        console.log(response.status);
        
        return (response.status === 200 ? response.data : null)
    } catch (error) {
        return false
    }
}

export const deletePersonalBudgetFromDB = async (category: string) => {
    const URL = baseUrl + 'api/budget/delete'
    try {
        const response = await axios.delete(URL, { data: { category } });
        return (response.status === 200 ? true : false)
    } catch (error) {
        return false
    }
}
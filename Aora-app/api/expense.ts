import { ExpenseType } from "@/types/types";
import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addExpenseToDB = async (expense: ExpenseType) => {
    const URL = baseUrl + 'api/expense/add'
    try {
        const response = await axios.post(URL, {...expense})
        console.log("after post");
        
        return response.status === 201
    } catch (error) {
        return false
    }
}
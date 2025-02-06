import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const signUpUser = async (username: string, email: string, password: string):Promise<boolean> => {
    const URL = baseUrl + 'api/auth/signup'
    try {
        const response = await axios.post(URL, { username, email, password })
        return response.status === 201
    } catch (error) {
        return false
    }
}

export const loginUser = async (email: string, password: string):Promise<boolean> => {
    const URL = baseUrl + 'api/auth/login'
    try {
        const response = await axios.post(URL, { email, password })
        return response.status === 200
    } catch (error) {
        return false
    }
}

export const logoutUser = async() => {
    const URL = baseUrl + 'api/auth/logout'
    try {
        const response = await axios.post(URL)
        return response.status === 200 ? true : false
    } catch (error) {
        return false
    }
}


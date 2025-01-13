import { baseUrl } from "@/utils/urls";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityIndicator } from "react-native";
import Expense from "./Expense";

interface AuthProviderProps {
    children: React.ReactNode;
}
interface AuthContextType {
    user: any,
    setUser: any
}
const AuthContext = createContext<AuthContextType>({
    user: {},
    setUser: () => { }
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<AuthContextType>({
        user: null,
        setUser: () => { }
    })
    const [loading, setLoading] = useState(true)

    const attachTotalExpenses = (data: any) => {
        const totalExpenses = data.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
        data.totalExpenses = totalExpenses
    }

    const attachCategoriesTotal = (data: any) => {
        let categoriesTotal = data.expenses.reduce((arr: any, expense: any) => {
            if(!arr[expense.category])
                arr[expense.category] = 0
            arr[expense.category] += expense.amount
            return arr
        }, {});
        
        categoriesTotal = Object.keys(categoriesTotal).map((category) => {
            return {name: category, total: categoriesTotal[category]}
        })

        data.CategoriesTotal = categoriesTotal
    }

    const loadUserData = async () => {
        try {
            const response = await axios.get(baseUrl + "api/user/getData")
            let { data } = response

            attachTotalExpenses(data)

            attachCategoriesTotal(data)

            setUser(data)
            console.log(data);
            
            await AsyncStorage.setItem('@user', JSON.stringify(data))
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {loading ? <ActivityIndicator /> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
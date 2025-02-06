import { baseUrl } from "@/utils/urls";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityIndicator } from "react-native";

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

    const attachTotalPersonalExpenses = (data: any) => {
        const totalPersonalExpenses = data.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
        data.totalPersonalExpenses = totalPersonalExpenses
    }

    const attachPersonalCategoriesTotal = (data: any) => {
        let categoriesTotal = data.expenses.reduce((arr: any, expense: any) => {
            
            if(!arr[expense.category])
                arr[expense.category] = 0
            arr[expense.category] += expense.amount
            return arr
        }, {});
        
        data.categories = data.categories.map((category: any) => {
            return {
                ...category,
                currentMonthtotal: categoriesTotal[category.name] || 0
            }
        })
        
    }

    const attachCommunitiesTotalExpenses = (data: any) => {

        data.communities.forEach((community: any) => {

            const communityExpenses = data.communitiesExpenses.filter((expense: any) => expense.communityCode === community.code);
        
            const totalExpense = communityExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
        
            community.total = totalExpense;
        });
    }

    const attachCommunitiesCategoriesTotal = (data: any) => {

        data.communitiesCategories.forEach((category: any) => {

            const categoryExpenses = data.communitiesExpenses.filter((expense: any) => 
                expense.communityCode === category.communityCode && expense.category === category.name
            );
        
            const totalExpense = categoryExpenses.reduce((sum:number, expense:any) => sum + expense.amount, 0);
        
            category.currentMonthtotal = totalExpense;
        });
        
    }

    const loadUserData = async () => {
        try {
            const response = await axios.get(baseUrl + "api/user/getData")
            let { data } = response

            attachTotalPersonalExpenses(data)

            attachPersonalCategoriesTotal(data)

            attachCommunitiesTotalExpenses(data)

            attachCommunitiesCategoriesTotal(data)
            
            const sortedPersonalExpenses = data.expenses.sort((a:any, b:any) => new Date(b.date) - new Date(a.date));
            
            data.expenses = sortedPersonalExpenses

            const sortedCommunitiesExpenses = data.communitiesExpenses.sort((a:any, b:any) => new Date(b.date) - new Date(a.date));

            data.communitiesExpenses = sortedCommunitiesExpenses

            setUser(data)

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
import React, { useMemo } from 'react'
import { Text, View } from "react-native"
import Financials from "./Financials"
import LowPartExpenses from "./LowPartExpenses"
import TopPartExpenses from "./TopPartExpenses"
import RecentExpenses from './RecentExpenses'
import { useAuth } from '../AuthContext'
import { numberOfRecentExpenses } from '@/utils/constants'

const MyPersonnal = () => {

    const { user } = useAuth()

    const userExpensesList = useMemo(() => {
        return user.expenses.filter((expense: any, index: number) => index < numberOfRecentExpenses)
    }, [user.expenses])

    return (
        <View className='flex-1 gap-6'>
            <View className='w-full border-4 border-gray-50 rounded-3xl flex-col mt-6 p-6 gap-6'>
                <TopPartExpenses totalExpenses={user.totalPersonalExpenses}/>
                <LowPartExpenses totalExpenses={user.totalPersonalExpenses} categories={user.categories}/>
            </View>

            <RecentExpenses expenses={userExpensesList} categories={user.categories}/>
        </View>
    )
}

export default MyPersonnal
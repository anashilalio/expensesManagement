import React, { useMemo } from 'react'
import { Text, View } from "react-native"
import Financials from "./Financials"
import LowPartExpenses from "./LowPartExpenses"
import TopPartExpenses from "./TopPartExpenses"
import RecentExpenses from './RecentExpenses'
import { useAuth } from '../AuthContext'
import { numberOfRecentExpenses } from '@/utils/constants'

interface MyPersonnalProps {
  currentMonthIndex: number
}

const MyPersonnal: React.FC<MyPersonnalProps> = ({ currentMonthIndex }) => {
  const { user } = useAuth()

  const filteredExpenses = useMemo(() => {
    return user.expenses.filter((expense: any) => {
      const expenseMonth = new Date(expense.date).getMonth()
      return expenseMonth === currentMonthIndex
    })
  }, [user.expenses, currentMonthIndex])

  const totalPersonalExpensesForMonth = useMemo(() => {
    return filteredExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0)
  }, [filteredExpenses])

  const userRecentExpenses = useMemo(() => {
    return filteredExpenses.slice(0, numberOfRecentExpenses)
  }, [filteredExpenses])

  return (
    <View className='flex-1 gap-6'>
      <View className='w-full border-4 border-gray-50 rounded-3xl flex-col mt-6 p-6 gap-6'>
        <TopPartExpenses totalExpenses={totalPersonalExpensesForMonth} />
        <LowPartExpenses totalExpenses={totalPersonalExpensesForMonth} categories={user.categories} />
      </View>
      <RecentExpenses expenses={userRecentExpenses} categories={user.categories} />
    </View>
  )
}

export default MyPersonnal

import React, { useEffect, useMemo } from 'react'
import { Text, View } from "react-native"
import Financials from "./Financials"
import LowPartExpenses from "./LowPartExpenses"
import TopPartExpenses from "./TopPartExpenses"
import RecentExpenses from './RecentExpenses'
import { useAuth } from '../AuthContext'
import { numberOfRecentExpenses } from '@/utils/constants'

interface MyPersonnalProps {
  currentMonthIndex: number
  currentYear: number
}

const MyPersonnal: React.FC<MyPersonnalProps> = ({ currentMonthIndex, currentYear }) => {

  const { user, setUser } = useAuth()

  const filteredExpenses = useMemo(() => {
    return user.expenses.filter((expense: any) => {
      const expenseMonth = new Date(expense.date).getMonth()
      const expenseYear = new Date(expense.date).getFullYear() 
      return (expenseMonth === currentMonthIndex && expenseYear === currentYear)
    })
  }, [user.expenses, currentMonthIndex, currentYear])

  const totalExpensesForMonth = useMemo(() => {
    return filteredExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0)
  }, [filteredExpenses])

  const monthRecentExpenses = useMemo(() => {
    return filteredExpenses.slice(0, numberOfRecentExpenses)
  }, [filteredExpenses])

  useEffect(() => {

    let categoriesTotal = filteredExpenses.reduce((arr: any, expense: any) => {
      if (!arr[expense.category])
        arr[expense.category] = 0
      arr[expense.category] += expense.amount
      return arr
    }, {});


    const updatedCategories = user.categories.map((category: any) => {
      return {
        ...category,
        total: categoriesTotal[category.name] || 0
      }
    })

    setUser({
      ...user,
      categories: updatedCategories
    })
    
  }, [filteredExpenses])

  return (
    <View className='flex-1 gap-6'>
      <View className='w-full border-4 border-gray-50 rounded-3xl flex-col mt-6 p-6 gap-6'>
        <TopPartExpenses totalExpenses={totalExpensesForMonth} currentMonthIndex={currentMonthIndex} currentYear={currentYear} />
        <LowPartExpenses totalExpenses={totalExpensesForMonth} categories={user.categories} />
      </View>
      <RecentExpenses expenses={monthRecentExpenses} categories={user.categories} />
    </View>
  )
}

export default MyPersonnal

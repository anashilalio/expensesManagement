import { ScrollView, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopPartExpenses from '@/components/TopPartExpenses'
import LowPartExpenses from '@/components/LowPartExpenses'
import RecentExpenses from "../../components/Home/RecentExpenses"
import Header from "../../components/Home/header"
import Financials from '@/components/Home/Financials'


interface categoryType {
  category: string,
  amount: number
}

interface CurrencyContextType {
  currency: string,
  totalExpenses: number
}

interface PieChartContextType {
  categoryData: categoryType[],
  currency: string,
  totalExpenses: number
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: '',
  totalExpenses: 0
})

export const PieChartContext = createContext<PieChartContextType>({
  categoryData: [],
  currency: '',
  totalExpenses: 0
})

const Home = () => {

  const [categoryData, setcategoryData] = useState<categoryType[]>([
    { category: "Transport", amount: 2700},
    { category: "Food", amount: 1500},
    { category: "Entertainment", amount: 600},
    { category: "Shopping", amount: 3500}
  ])

  const [totalExpenses, setTotalExpenses] = useState(0)

  const [currency, setcurrency] = useState("dollar")

  useEffect(() => {
    let total = 0
    for (const expense of categoryData) {
      total += expense.amount
    }
    setTotalExpenses(total)
  }, [categoryData])

  return (
    <SafeAreaView className='h-full w-full bg-white '>
      <ScrollView>
        <View className='mx-6'>

          <Header />

          <View className="flex-col justify-center align-center w-full mt-6">
            <Text className=' text-sm font-pregular text-center text-gray-600 '>
              Account Ballance
            </Text>
            <Text className=' text-2xl font-bold  text-center'>$9000</Text>
          </View>

          <View className='flex-row justify-between gap-6 mt-6'>
            <Financials title="Income" amount="9000" bg='green' arrowIconName='arrow-down' />
            <Financials title="Expenses" amount="4000" bg='red' arrowIconName='arrow-up' />
          </View>

          <View className='w-full border-4 border-gray-50 rounded-3xl flex-col
            mt-6 p-6 gap-6'>
            <CurrencyContext.Provider value={{ currency, totalExpenses }}>
              <TopPartExpenses />
            </CurrencyContext.Provider>
            <PieChartContext.Provider value={{ categoryData, currency, totalExpenses }}>
              <LowPartExpenses />
            </PieChartContext.Provider>
          </View>

          <RecentExpenses />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
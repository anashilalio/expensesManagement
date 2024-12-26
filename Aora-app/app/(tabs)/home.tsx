import { ScrollView, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import TopPartExpenses from '@/components/TopPartExpenses'
import LowPartExpenses from '@/components/LowPartExpenses'
import { GiWallet } from "react-icons/gi";
import { FaArrowDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import RecentExpenses from "../../components/Home/RecentExpenses"
import Header from "../../components/Home/header"

interface categoryType {
  category: string,
  amount: number,
  color: string,
  index: number
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
    { category: "Transport", amount: 2700, color: "pink", index: 0 },
    { category: "Food", amount: 1500, color: "red", index: 1 },
    { category: "Rent", amount: 600, color: "green", index: 2 }
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
      <ScrollView className='px-6 pt-6'>
        
      <Header />
        <View className="flex-col justify-center align-center w-full ">
          <Text className=' text-sm text-center text-gray-600 '>
            Account Ballance
          </Text>
          <Text className=' text-2xl font-bold  text-center'>9000 $</Text>

        </View>
        <View className='flex justify-between flex-row gap-4 '>
          <View className='bg-green-600 rounded-3xl flex-row py-4  w-2/4 justify-center  gap-4  '>
            <View className="flex justify-center items-center text-green-600 align-center bg-white rounded-lg ">
              <FaArrowDown />
              <GiWallet className='size-10'/>
            </View>
            <View className=' gap-1 pt-2'>
            <Text className=' text-white text-lg font-bold'>Income</Text>
            <Text className=' text-white text-lg font-bold text-center'>900$</Text>
            </View>
          </View>
          <View className='bg-red-600 rounded-3xl flex-row py-4  w-2/4 justify-center  gap-4  '>
            <View className="flex justify-center items-center text-red-600 align-center bg-white rounded-lg ">
              <FaArrowDown />
              <GiWallet className='size-10'/>
            </View>
            <View className=' gap-1 pt-2'>
            <Text className=' text-white text-lg font-bold'>Expenses</Text>
            <Text className=' text-white text-lg font-bold text-center'>400$</Text>
            </View>
          </View>
        </View>

        <View className='w-full bg-white border-4 border-gray-50 rounded-3xl flex-col
          mt-6 p-6 gap-6'>

          <CurrencyContext.Provider value={{ currency, totalExpenses }}>
            <TopPartExpenses />
          </CurrencyContext.Provider>

          <PieChartContext.Provider value={{ categoryData, currency, totalExpenses }}>
            <LowPartExpenses />
          </PieChartContext.Provider>

        </View>
        <RecentExpenses />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
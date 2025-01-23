import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopPartExpenses from '@/components/Home/TopPartExpenses'
import LowPartExpenses from '@/components/Home/LowPartExpenses'
import RecentExpenses from "../../components/Home/RecentExpenses"
import Header from "../../components/Home/header"
import Financials from '@/components/Home/Financials'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useAuth } from '@/components/AuthContext'
import Community from '@/components/community/Community'

interface CurrencyContextType {
  currency: string
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: ''
})

const Home = () => {
  const [showCommunity , setShowCommunity ] = useState(false);
  const { user, setUser } = useAuth()

  const [currency, setcurrency] = useState("dollar")

  const [showMenu, setShowMenu] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ];

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % 12);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + 12) % 12);
  };
  if(showCommunity){
    return <Community onBack={()=> setShowCommunity(false)} />
  }
  return (
    <SafeAreaView className='h-full w-full bg-white '>
      <ScrollView>

        {showMenu && (
          <View className="absolute top-0 left-0 h-full w-full bg-white z-50 pt-4 px-8">
            <TouchableOpacity className='z-51' onPress={() => setShowMenu((prev) => !prev)}>
              <Ionicons name="menu" className='z-51 text-black' size={24} color="black" />
            </TouchableOpacity>
            <View className='flex flex-col  h-full'>
              <View className='flex flex-col  h-2/4 justify-center'>
                <TouchableOpacity className="p-4  border-black">
                  <Text className="text-black text-xl">Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4  border-black" onPress={()=>setShowCommunity(true)}>
                  <Text className="text-black text-xl">Community</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4  border-black">
                  <Text className="text-black text-xl">Settings</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="p-4  border-gray">
                <Text className="text-black text-xl">Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className='mx-6'>

          <View>
            <View className="flex-row justify-between items-center mt-4 px-4">
              <TouchableOpacity className='z-51' onPress={() => setShowMenu((prev) => !prev)}>
                <Ionicons name="menu" className='z-51' size={24} color="black" />
              </TouchableOpacity>

              <View className="flex-row items-center">
                <TouchableOpacity onPress={handlePreviousMonth}>
                  <FontAwesome6 name="chevron-left" size={18} color="black" />
                </TouchableOpacity>
                <Text className="font-semibold mx-2">{months[currentMonthIndex]}</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                  <FontAwesome6 name="chevron-right" size={18} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Ionicons name="notifications" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-col justify-center align-center w-full mt-6">
            <Text className=' text-sm font-pregular text-center text-gray-600 '>
              Account Ballance
            </Text>
            <Text className=' text-2xl font-bold  text-center'>$9000</Text>
          </View>

          <View className='flex-row justify-between gap-6 mt-6'>
            <Financials title="Income" amount="9000" bg='green' arrowIconName='arrow-down' />
            <Financials title="Expenses" amount={user.totalExpenses} bg='red' arrowIconName='arrow-up' />
          </View>

          <View className='w-full border-4 border-gray-50 rounded-3xl flex-col
            mt-6 p-6 gap-6'>
            <CurrencyContext.Provider value={{ currency }}>
              <TopPartExpenses />
            </CurrencyContext.Provider>
            <CurrencyContext.Provider value={{ currency }}>
              <LowPartExpenses />
            </CurrencyContext.Provider>
          </View>

          <RecentExpenses />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
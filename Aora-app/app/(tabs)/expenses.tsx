import { ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/components/AuthContext';
import Expense from '@/components/Expense';



interface ExpenseType {
  name?: string,
  category: string,
  amount: number
}

const Expenses = () => {

  const { user, setUser } = useAuth()

  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <ScrollView className='px-6 pt-6'>
        <View className='flex flex-row justify-between px-2 mt-4'>
          <Icon name="filter-list" size={24} color="#000" />
          <Icons name="calendar-clear-sharp" size={24} color="#000" />

        </View>

        <View className="flex-row justify-between py-4">
        </View>
        <View className='gap-2'>
          {user.expenses.map((expense: any, index: number) => {
            return (
              <Expense
                key={index}
                description={expense.description}
                category={expense.category}
                amount={expense.amount}
                date={expense.date}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Expenses
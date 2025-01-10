import {ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExpenseItem from '@/components/ExpenseItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';



interface ExpenseType{
  name?:string,
  category: string,
  amount: number
}

const Expenses = () => {

  const [expensesData, setExpensesData] = useState<ExpenseType[]>([
    {name:'Sandwich', category: 'Food', amount: 20},
    {category: 'Food', amount: 60},
    {category: 'Food', amount: 50},
    {name: 'Chicken', category: 'Food', amount: 40},
    {category: 'Food', amount: 16},
    {name: 'flight', category: 'Transport', amount: 120},
    {name: 'bus', category: 'Transport', amount: 180},
    {category: 'Rent', amount: 800},
    {category: 'Transport', amount: 200},
    {category: 'Food', amount: 120},
    {category: 'Food', amount: 200}
  ])

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
          {expensesData.map((expense, index) => {
            return(
              <ExpenseItem
                key={index}
                name={expense.name}
                category={expense.category}
                amount={expense.amount}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Expenses
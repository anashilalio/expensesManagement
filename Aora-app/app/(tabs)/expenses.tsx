import {ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExpenseItem from '@/components/ExpenseItem'
import { MdFilterList } from "react-icons/md";
import { IoCalendarClearSharp } from "react-icons/io5";

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
        <View className="flex-row justify-between py-4">
        <IoCalendarClearSharp className='size-8'/>
        <MdFilterList className='size-8'/>
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
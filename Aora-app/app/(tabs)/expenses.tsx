import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/components/AuthContext';
import Expense from '@/components/Expense';
import ExpenseDetails from '@/components/expenses/ExpenseDetails';



interface ExpenseType {
  name?: string,
  category: string,
  amount: number
}

const Expenses = () => {

  const { user } = useAuth()
  const [selectedExpense, setSelectedExpense] = useState(null)

  const expensesList = useMemo(() => {
    return user.expenses.map((expense: any, index: number) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedExpense(expense)
        }}
      >
        <Expense
          description={expense.description}
          category={expense.category}
          amount={expense.amount}
          date={expense.date}
        />
      </TouchableOpacity>
    ))
  }, [user.expenses])
  if (selectedExpense) {
    return (
      <ExpenseDetails
        expense={selectedExpense}
        onBack={() => setSelectedExpense(null)}
      />
    )
  }
  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <ScrollView className='px-6'>
        
        <View className='flex flex-row justify-between px-2 mt-4'>
          <Icon name="filter-list" size={24} color="#000" />
          <Icons name="calendar-clear-sharp" size={24} color="#000" />
        </View>

        <View className='py-5 gap-2'>
          {expensesList}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Expenses
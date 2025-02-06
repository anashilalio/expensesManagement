import React, { useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useAuth } from '@/components/AuthContext'
import Expense from '@/components/Expense'
import ExpenseDetails from '@/components/expenses/ExpenseDetails'

interface ExpenseType {
  name?: string,
  category: string,
  description: string,
  amount: number,
  date: string
}

const Expenses = () => {
  const { user } = useAuth()
  const[isCommunity , setIsCommunity ] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType | null>(null)
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [sortOption, setSortOption] = useState<string | null>(null)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  
  const { width } = useWindowDimensions()

  const iconSize = width < 400 ? 20 : 24

  const categoriesColors = useMemo(() => {
    return user.categories.reduce((arr: any, category: any) => {
      arr[category.name] = category.color
      return arr
    }, {})
  }, [user.categories])

  const sortedExpenses = useMemo(() => {
    let expensesCopy = [...user.expenses]

    if (selectedCalendarDate) {
      expensesCopy = expensesCopy.filter((expense: ExpenseType) =>
        expense.date.substring(0, 10) === selectedCalendarDate
      )
    }

    if (sortOption === 'name') {
      expensesCopy.sort((a: ExpenseType, b: ExpenseType) =>
        a.description.localeCompare(b.description)
      )
    } else if (sortOption === 'date-desc') {
      expensesCopy.sort((a: ExpenseType, b: ExpenseType) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    } else if (sortOption === 'date-asc') {
      expensesCopy.sort((a: ExpenseType, b: ExpenseType) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    }
    return expensesCopy
  }, [user.expenses, sortOption, selectedCalendarDate])

  const expensesList = useMemo(() => {
    return sortedExpenses.map((expense: ExpenseType, index: number) => (
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
          color={categoriesColors[expense.category]}
        />
      </TouchableOpacity>
    ))
  }, [sortedExpenses, categoriesColors])

  if (selectedExpense) {
    return (
      <ExpenseDetails
        expense={selectedExpense}
        onBack={() => setSelectedExpense(null)}
      />
    )
  }

  const handleDateSortToggle = () => {
    if (sortOption === 'date-desc') {
      setSortOption('date-asc')
    } else {
      setSortOption('date-desc')
    }
    setShowFilterOptions(false)
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  
  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]
    setSelectedCalendarDate(formattedDate)
    hideDatePicker()
  }

  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <ScrollView className='px-6'>
        <View className='flex flex-row justify-between px-2 mt-4'>
          <TouchableOpacity onPress={() => setShowFilterOptions(prev => !prev)}>
            <Icon name="filter-list" size={iconSize} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={showDatePicker}>
            <Icons name="calendar-clear-sharp" size={iconSize} color="#000" />
          </TouchableOpacity>
        </View>

        {showFilterOptions && (
          <View className="mt-2 p-4 border border-gray-300 rounded-md">
            <Text className="text-gray-700 mb-2">Sort Expenses By:</Text>
            <TouchableOpacity
              onPress={() => {
                setSortOption('name')
                setShowFilterOptions(false)
              }}
              className="py-2"
            >
              <Text className="text-gray-700">Name A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDateSortToggle} className="py-2">
              <Text className="text-gray-700">
                Date {sortOption?.includes('date') ? (sortOption === 'date-desc' ? '(Descending)' : '(Ascending)') : '(Descending)'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className='text-gray-700' onPress={()=>setIsCommunity(e=>!e)}>
              {isCommunity ?  <Text>Personnal</Text> : 
              
              <Text>Community</Text>
              }
             
            </TouchableOpacity>
          </View>
        )}

        <View className='py-5 gap-2'>
          {expensesList}
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  )
}

export default Expenses

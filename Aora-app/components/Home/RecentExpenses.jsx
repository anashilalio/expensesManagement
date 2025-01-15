import { Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import Expense from '../Expense';
import { router } from 'expo-router';
import { useAuth } from '../AuthContext';

const RecentExpenses = () => {

  const { user } = useAuth()

  const numberOfExpenses = 5

  const expensesList = useMemo(() => {
    return (
      user.expenses
        .filter((expense, index) => index < numberOfExpenses)
        .map((expense, index) => {
          return (
            <Expense
              key={index}
              description={expense.description}
              category={expense.category}
              amount={expense.amount}
              date={expense.date}
            />
          );
        })
    )
  }, [user.expenses])
  
  const handleSeeMore = () => {
    router.push('/(tabs)/expenses')
  };

  return (
    <View className='mt-6 mb-6'>

      <View className='flex-row items-center justify-between'>
        <Text className="text-lg font-psemibold pl-3">Recent Expenses</Text>
        <TouchableOpacity
          className="bg-red-400 py-2 px-4 rounded-3xl"
          activeOpacity={0.6}
          onPress={() => handleSeeMore()}
        >
          <Text className="text-white text-center">See More</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-col gap-4 mt-4'>
        {expensesList}
      </View>
    </View>
  );
};

export default RecentExpenses;

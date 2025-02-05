import { Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import Expense from '../Expense';
import { router } from 'expo-router';

const RecentExpenses: React.FC<{ expenses: any, categories: any }> = ({ expenses, categories }) => {

  const expensesList = useMemo(() => {
    if (expenses === null || expenses === undefined || categories === undefined)
      return (
        <View className='flex-1 pt-12'>
          <Text className='text-center font-plight text-text-gray'>
            No expenses
          </Text>
        </View>
      )

    return (

      expenses.map((expense: any, index: number) => {

        const category = categories.find((category: any) => category.name === expense.category)
console.log("categor found");
console.log(category);

        if(category === undefined)
          return
        
        const color = category.color
        
        return (
          <Expense
            key={index}
            description={expense.description}
            category={expense.category}
            amount={expense.amount}
            date={expense.date}
            color={color}
          />
        );
      })
    )
  }, [expenses, categories])

  const handleSeeMore = () => {
    router.push('/(tabs)/expenses')
  };

  return (
    <View className='mb-6'>
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
        {
          expensesList.length > 0 
          ? expensesList
          : <Text className='font-plight text-lg text-gray-400 text-center mt-8'>No expenses</Text>
        }
      </View>
    </View>
  );
};

export default RecentExpenses;

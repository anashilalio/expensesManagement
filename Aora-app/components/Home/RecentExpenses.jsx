import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Expense from './Expense';
import { router } from 'expo-router';
const RecentExpenses = () => {
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
        <Expense category="Shopping" name="Groceries" amount="1200" date={new Date()}/>
        <Expense category="Food" name="Macdonalds" amount="135" date={new Date()}/>
        <Expense category="Entertainment" name="Cinema" amount="70" date={new Date()}/>
        <Expense category="Transport" name="Bus" amount="15" date={new Date()}/>
      </View>
    </View>
  );
};

export default RecentExpenses;

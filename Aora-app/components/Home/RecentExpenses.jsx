import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Expense from './Expense';
const RecentExpenses = () => {
  const handleSeeMore = () => {
    console.log('See More clicked');
  };

  return (
    <View >
        <View className='flex-row justify-between'>
      <Text className="text-lg font-bold mb-2">Recent Expenses</Text>
      <TouchableOpacity
        className="bg-red-400 py-2 px-4 rounded "
      >
        <Text className="text-white text-center ">See More</Text>
      </TouchableOpacity>
        </View>
        <Expense name="Shop" spent="100" details="clothes , shoes"/>
        <Expense name="Subscription" spent="300" details="Amazon , Youtube Premium"/>
    </View>
  );
};

export default RecentExpenses;

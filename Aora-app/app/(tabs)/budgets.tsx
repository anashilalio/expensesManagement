import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CreateBudgetPage from '../../components/Budget/CreateBudgetPage';
import ItemBudget from '../../components/Budget/itemBudget'
const Budgets = () => {
  const [showCreateBudgetPage, setShowCreateBudgetPage] = useState(false);
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
  if (showCreateBudgetPage) {
    return <CreateBudgetPage onBack={() => setShowCreateBudgetPage(false)} />;
  }

  return (
    <View className="flex-1 bg-violet">
      <View className="flex-row justify-between items-center pt-5 px-5 h-44">
          <TouchableOpacity onPress={handlePreviousMonth}>
                  <Text className="text-white text-xl font-bold">&lt;</Text>
        </TouchableOpacity>
          <Text className=" mx-2 text-white text-xl font-bold" >{months[currentMonthIndex]}</Text>
          <TouchableOpacity  onPress={handleNextMonth}>
          <Text className="text-white text-xl font-bold">&gt;</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-violet">
        <View className="flex-1 bg-gray-100 rounded-t-3xl  items-center  px-8 mt-8">
          {/* <Text className="text-gray-500 text-base text-center">You don't have a budget.</Text>
          <Text className="text-gray-500 text-base text-center">Let's make one so you are in control.</Text> */}
          <ItemBudget category="Shooping" spend="1000" max="1200"/>
          <ItemBudget category="Subscription" spend="3000" max="4000" />
          
        </View>
      </View>

      <View className="px-5 pb-5 bg-white">
        <TouchableOpacity
          className="bg-violet rounded-lg flex-row py-4 justify-center items-center"
          onPress={() => setShowCreateBudgetPage(true)}
        >
          <Text className="text-white text-lg font-bold bg-violet">Create a Budget</Text>
          <Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Budgets;

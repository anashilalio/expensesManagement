import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

interface BudgetType {
  currentAmount: number;
  maxAmount: number;
  category: string;
}

interface BudgetDetailsProps {
  budget: BudgetType | null;
  onBack: () => void;
}

const BudgetDetails: React.FC<BudgetDetailsProps> = ({ budget, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [maxAmount, setMaxAmount] = useState(budget?.maxAmount || 0);

  const progress = budget ? (budget.currentAmount / maxAmount) * 100 : 0;

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5 items-center">
      <View className="w-full flex-row justify-between items-center mb-5">
        <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
          <Icon name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <TouchableOpacity className="p-3 bg-white rounded-full shadow-md">
          <Icon name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mb-6">
        <Icons name="shopping" size={24} color="black" />
        <Text className="text-lg font-semibold ml-2">{budget?.category || 'Category'}</Text>
      </View>

      <Text className="text-lg text-gray-500 font-medium">Remaining</Text>
      <Text className="text-5xl font-bold my-3">${budget?.currentAmount}</Text>

      <View className="w-full h-2 bg-gray-200 rounded-full my-4">
        <View style={{ width: `${progress}%` }} className="h-full bg-yellow-500 rounded-full" />
      </View>

      {isEditing ? (
        <TextInput
          className="w-full border border-gray-300 rounded-lg px-4 py-2 my-4"
          keyboardType="numeric"
          value={maxAmount.toString()}
          onChangeText={(text) => setMaxAmount(Number(text))}
        />
      ) : (
        <Text className="text-black text-lg font-semibold">Max: ${maxAmount}</Text>
      )}

      <TouchableOpacity
        className="mt-auto mb-12 bg-purple-600 py-3 w-full items-center rounded-lg"
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text className="text-white text-lg font-bold">{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BudgetDetails

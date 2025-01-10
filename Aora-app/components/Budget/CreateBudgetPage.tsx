import { Text, View, TouchableOpacity, Switch, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

type CreateBudgetPageProps = {
  onBack: () => void;
};

const CreateBudgetPage: React.FC<CreateBudgetPageProps> = ({ onBack }) => {
  const [receiveAlert, setReceiveAlert] = useState(false);
  const [alertPercentage, setAlertPercentage] = useState<number>(80);
  const [budgetAmount, setBudgetAmount] = useState<string>('0');

  const handleSliderChange = useCallback(
    debounce((value: number) => {
      setAlertPercentage(Math.round(value));
    }, 100), 
    []
  );

  return (
    <View className="flex-1 bg-violet">
      <View className="flex-row items-center pt-10 px-5 h-24 w-full">
        <TouchableOpacity onPress={onBack}>
          <Text className="text-white text-3xl font-bold ">&lt;</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold text-center">Create Budget</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-base">How much do you want to spend?</Text>
        <View className="flex  flex-row items-center justify-center">
        <Text style={{
            color: 'white',
            fontSize: 40,
            marginTop: 8,
            textAlign: 'center',
          }}>
          $
        </Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 40,
            marginTop: 8,
            textAlign: 'center',
          }}
          keyboardType="numeric"
          value={budgetAmount}
          onChangeText={setBudgetAmount}
        />

        </View>
      </View>

      <View className="bg-white rounded-t-3xl p-5">
        <View className="border-b border-gray-300 pb-4">
          <Text className="text-gray-500">Category</Text>
          <Text className="text-black mt-2">Shopping</Text>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-gray-500">Receive Alert</Text>
          <Switch
            value={receiveAlert}
            onValueChange={() => setReceiveAlert(!receiveAlert)}
          />
        </View>

        {receiveAlert && (
          <View className="mt-6">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">0%</Text>
              <Text className="text-gray-500">{alertPercentage}%</Text>
              <Text className="text-gray-500">100%</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={100}
              value={alertPercentage}
              onValueChange={(value: number) => handleSliderChange(value)}
              minimumTrackTintColor="#7C3AED"
              maximumTrackTintColor="#D1D5DB"
            />
          </View>
        )}

        <TouchableOpacity className="bg-violet rounded-lg py-4 mt-6">
          <Text className="text-white text-center text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateBudgetPage;

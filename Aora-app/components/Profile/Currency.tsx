import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CurrencyProps {
  onBack: () => void
}

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'MAD', name: 'Moroccan Dirham' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
]

const Currency: React.FC<CurrencyProps> = ({ onBack }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('MAD')

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4">
        <View className="w-full flex-row justify-between items-center my-4">
          <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
            <Icon name="arrow-back" size={24} color="#4b5563" />
          </TouchableOpacity>
          <View className="w-12" />
        </View>

        <ScrollView className="mt-4">
          {currencies.map((currency, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCurrency(currency.code)}
              className={`flex-row justify-between items-center p-4 mb-3 rounded-lg shadow-sm border ${
                selectedCurrency === currency.code
                  ? 'bg-blue-100 border-blue-400'
                  : 'bg-white border-gray-200'
              }`}
            >
              <View>
                <Text className="text-lg font-medium text-gray-800">{currency.name}</Text>
                <Text className="text-sm text-gray-600">{currency.code}</Text>
              </View>
              {selectedCurrency === currency.code && (
                <Icon name="check" size={24} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Currency

import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface ExportDataProps {
  onBack: () => void
}

const ExportData: React.FC<ExportDataProps> = ({ onBack }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false)
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false)

  const showStartPicker = () => setStartPickerVisibility(true)
  const hideStartPicker = () => setStartPickerVisibility(false)
  const handleConfirmStart = (date: Date) => {
    setStartDate(date)
    hideStartPicker()
  }

  const showEndPicker = () => setEndPickerVisibility(true)
  const hideEndPicker = () => setEndPickerVisibility(false)
  const handleConfirmEnd = (date: Date) => {
    setEndDate(date)
    hideEndPicker()
  }

  const handleExport = () => {
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4">
        <View className="w-full flex-row justify-between items-center my-4">
          <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
            <Icon name="arrow-back" size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Export Data</Text>
          <View className="w-12" />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Text className="text-lg font-medium text-gray-800 mb-4">Filter by Date</Text>
            <TouchableOpacity onPress={showStartPicker} className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
              <Text className="text-gray-700">Start Date: {startDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showEndPicker} className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-6">
              <Text className="text-gray-700">End Date: {endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExport} className="bg-violet py-3 rounded-lg items-center">
              <Text className="text-white font-semibold">Export CSV</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        date={startDate}
        onConfirm={handleConfirmStart}
        onCancel={hideStartPicker}
      />
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        date={endDate}
        onConfirm={handleConfirmEnd}
        onCancel={hideEndPicker}
      />
    </SafeAreaView>
  )
}

export default ExportData

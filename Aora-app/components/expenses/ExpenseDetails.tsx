import React, { useState } from 'react'
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import { categoryIcons } from '@/utils/IconMapping'
import DefaultIcon from '../category-icons/DefaultIcon'

interface ExpenseType {
  description?: string
  category: string
  amount: number
  date: string
  color: string
}

interface ExpenseDetailsProps {
  expense: ExpenseType | null
  onBack: () => void
  
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ onBack, expense }) => {
  if (!expense) return null

  const IconComponent = categoryIcons[expense.category]
  const iconSize = 64
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState(expense.description || '')
  const [amountValue, setAmountValue] = useState(String(expense.amount))

 

  const handleSave = () => {
    const newAmount = parseFloat(amountValue)
    if (isNaN(newAmount)) {
      Alert.alert('Invalid amount', 'Please enter a valid number.')
      return
    }

 

    console.log('Updated Expense:', {
      description: descriptionValue,
      amount: newAmount
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setDescriptionValue(expense.description || '')
    setAmountValue(String(expense.amount))
    setIsEditing(false)
  }

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          console.log('Expense deleted')
        }
      }
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-6">
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity 
          onPress={onBack}
          className="p-2 bg-white rounded-full shadow-sm"
          style={{ elevation: 2 }}
        >
          <Icon name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">Expense Details</Text>
        <View className="w-8" />
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-sm" style={{ elevation: 3 }}>
        <View className="items-center mb-6">
          <View 
            className="p-4 rounded-full mb-4"
            style={{ backgroundColor: `${expense.color}20` }}
          >
            {IconComponent ? (
              <IconComponent size={iconSize} color={expense.color} />
            ) : (
              <DefaultIcon 
                size={iconSize} 
                name={expense.category} 
                color={expense.color}
              />
            )}
          </View>

          {isEditing ? (
            <TextInput
              className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-1 min-w-[80px] text-center"
              value={`$ ${amountValue}`}
              onChangeText={(text)=>{const numericValue = text.replace(/[^0-9.]/g, '')
                setAmountValue(numericValue)}}
              keyboardType="numeric"
            />
          ) : (
            <Text className="text-2xl font-bold text-gray-800">
              ${expense.amount.toFixed(2)}
            </Text>
          )}
        </View>

    
        <View className="space-y-4">
          <DetailItem
            label="Description"
            isEditing={isEditing}
            value={descriptionValue}
            onChangeText={setDescriptionValue}
          />
          <DetailItem
            label="Category"
            isEditing={false}  
            value={expense.category}
          />
          <DetailItem
            label="Date"
            isEditing={false} 
            value={formattedDate}
          />
        </View>

        <View className="flex-row justify-center gap-4 mt-8">
          {isEditing ? (
            <>
              <ActionButton 
                icon="content-save-outline" 
                label="Save" 
                color="#3b82f6" 
                onPress={handleSave}
              />
              <ActionButton 
                icon="close" 
                label="Cancel" 
                color="#ef4444" 
                onPress={handleCancel} 
              />
            </>
          ) : (
            <>
              <ActionButton 
                icon="pencil-outline" 
                label="Edit" 
                color="#3b82f6" 
                onPress={() => setIsEditing(true)}
              />
              <ActionButton 
                icon="trash-can-outline" 
                label="Delete" 
                color="#ef4444" 
                onPress={handleDelete} 
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ExpenseDetails


type DetailItemProps = {
  label: string
  value: string
  isEditing: boolean
  onChangeText?: (text: string) => void
}

const DetailItem = ({ label, value, isEditing, onChangeText }: DetailItemProps) => (
  <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
    <Text className="text-gray-500 font-medium">{label}</Text>
    {isEditing && onChangeText ? (
      <TextInput
        className="text-gray-700 font-semibold text-right border-b border-gray-300 min-w-[80px]"
        value={value}
        onChangeText={onChangeText}
      />
    ) : (
      <Text
        className="text-gray-700 font-semibold max-w-[60%] text-right"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    )}
  </View>
)


const ActionButton = ({
  icon,
  label,
  color,
  onPress
}: {
  icon: string
  label: string
  color: string
  onPress: () => void
}) => (
  <TouchableOpacity 
    className="flex-row items-center px-6 py-3 rounded-xl"
    style={{ backgroundColor: `${color}20` }}
    onPress={onPress}
  >
    <Icons name={icon} size={20} color={color} />
    <Text className="ml-2 font-semibold" style={{ color }}>
      {label}
    </Text>
  </TouchableOpacity>
)

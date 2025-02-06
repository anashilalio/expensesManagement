import React, { useMemo, useState } from 'react'
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
import { deleteExpenseFromDB, updateExpenseInDB } from '@/api/expense'
import Toast from 'react-native-toast-message'
import { useAuth } from '../AuthContext'
import { UpdateExpenseType } from '@/types/types'
import tinycolor from 'tinycolor2'

interface ExpenseDetailsProps {
  expense: any
  onBack: () => void

}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ onBack, expense }) => {

  if (!expense)
    return null

  const { user, setUser } = useAuth()

  const IconComponent = categoryIcons[expense.category]
  const iconSize = 64
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const categoriesColors = useMemo(() => {
    return user.categories.reduce((arr: any, category: any) => {
      arr[category.name] = category.color;
      return arr;
    }, {});
  }, user.categories)

  const bgColor = (category: string) => {
    let degree = 30
    switch (category) {
      case "Transport":
        degree = 50
        break;
      case "Food":
        degree = 45
        break;
      case "Shopping":
        degree = 29
        break;
      case "Entertainment":
        degree = 50
        break;
      default:
        break;
    }

    return tinycolor(categoriesColors[category]).lighten(degree).toString();
  }

  const [isEditing, setIsEditing] = useState(false)

  const [updatedExpense, setUpdatedExpense] = useState<UpdateExpenseType>({
    id: expense._id,
    description: expense.description,
    amount: expense.amount
  })

  const updateExpenseInUserState = (newExpense: any) => {

    const updatedExpenses = user.expenses.map((exp: any) => {
      if (exp._id === newExpense._id) {
        return newExpense
      }
      return exp
    })

    // update total of the category containing updated expense
    const updatedCategories = user.categories.map((category: any) => {
      if (category.name === newExpense.category) {
        category.total -= expense.amount - newExpense.amount
      }
      return category
    })

    // update total personal expenses
    const updatedTotalPersExps = user.totalPersonalExpenses - expense.amount + newExpense.amount

    setUser(
      {
        ...user,
        expenses: updatedExpenses,
        categories: updatedCategories,
        totalPersonalExpenses: updatedTotalPersExps
      }
    )
  }

  const updateExpense = async () => {

    const newExpense = await updateExpenseInDB(updatedExpense)

    if (newExpense) {

      updateExpenseInUserState(newExpense)

      onBack()

      Toast.show({
        type: "success",
        text1: "Expense Updated",
        text2: "The expense was updated successfully!",
        position: "top",
      });

    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete expense. Try again.",
        position: "top",
      });
    }
  }

  const handleUpdate = () => {
    updateExpense()
    setIsEditing(false)
  }

  const handleCancel = () => {
    setUpdatedExpense({
      id: expense._id,
      description: expense.description,
      amount: expense.amount
    })
    setIsEditing(false)
  }

  const deleteExpenseFromUserState = () => {

    // update list of expenses
    const updatedExpenses = user.expenses.filter((exp: any) => exp._id !== expense._id)

    // update total of the category containing deleted expense
    const updatedCategories = user.categories.map((category: any) => {
      if (category.name === expense.category) {
        category.total -= expense.amount
      }
      return category
    })

    // update total personal expenses
    const updatedTotalPersExps = user.totalPersonalExpenses - expense.amount

    setUser(
      {
        ...user,
        expenses: updatedExpenses,
        categories: updatedCategories,
        totalPersonalExpenses: updatedTotalPersExps
      }
    )
  }

  const deleteExpense = async (id: string) => {

    const deleted = await deleteExpenseFromDB(id)
    if (deleted) {

      deleteExpenseFromUserState()

      onBack()

      Toast.show({
        type: "success",
        text1: "Expense Deleted",
        text2: "The expense was removed successfully!",
        position: "top",
      });

    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete expense. Try again.",
        position: "top",
      });
    }
  }

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expense._id)
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
            style={{ backgroundColor: `${bgColor(expense.category)}` }}
          >
            {IconComponent ? (
              <IconComponent size={iconSize} />
            ) : (
              <DefaultIcon
                size={iconSize}
                name={expense.category}
                color={categoriesColors[expense.category]}
              />
            )}
          </View>

          {isEditing ? (
            <TextInput
              className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-1 min-w-[80px] text-center"
              value={`$ ${updatedExpense.amount}`}
              onChangeText={(text) => {
                const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''))
                const amount = isNaN(numericValue) ? 0 : numericValue;
                setUpdatedExpense({ ...updatedExpense, amount })
              }}
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
            value={updatedExpense.description}
            onChangeText={(input) => setUpdatedExpense({ ...updatedExpense, description: input })}
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
                onPress={handleUpdate}
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

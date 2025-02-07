import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  Modal,
  Button,
  Alert,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import * as ImagePicker from 'expo-image-picker'
import { CommunityExpenseType, ExpenseType } from '@/types/types'
import { formatISO } from 'date-fns'
import { useAuth } from '@/components/AuthContext'
import { addPersonalCategoryToDB, addCommunityCategoryToDB } from '@/api/category'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultCategoriesNum } from '@/utils/constants'
import { customCategoriesColor } from '@/utils/categoriesColors'
import { addCommunityExpenseToDB, addPersonalExpenseToDB } from '@/api/expense'
import Toast from 'react-native-toast-message'
import { updateAmountCommunityBudgetInDB, updateAmountPersonalBudgetInDB } from '@/api/budget'
import Ionicons from '@expo/vector-icons/Ionicons';
import mime from 'mime'
import { postToGemini } from '@/api/imageScanning'


const Add = () => {

  const { user, setUser } = useAuth()

  const [attachments, setAttachments] = useState<string[]>([])

  const [personalCategories, setPersonalCategories] = useState([
    { label: '', value: '', parent: '' }
  ])
  const [communitiesCategories, setCommunitiesCategories] = useState([
    { label: '', value: '' }
  ])
  const [categories, setCategories] = useState<any>('')

  useEffect(() => {

    const personalCategoriesLabelValue = user.categories.map((category: any) => ({
      label: category.name,
      value: category.name,
      parent: 'personal-categories'
    }))

    setPersonalCategories([{
      label: 'Personal',
      value: 'personal',
      key: 'personal-categories',
      inputLabel: 'Personal',
      color: 'gray'
    },
    ...personalCategoriesLabelValue])
  }, [user.categories])

  useEffect(() => {

    const tmp = user.communitiesCategories.reduce((acc: any, communityCateg: any) => {
      if (!acc[communityCateg.communityCode]) {
        acc[communityCateg.communityCode] = []
      }
      acc[communityCateg.communityCode].push(communityCateg.name)
      return acc
    }, {})

    const array = Object.keys(tmp).map((key) => ({ communityCode: key, names: tmp[key] }))

    const updatedArray = array.map(item => {
      const communi = user.communities.find((c: any) => c.code === item.communityCode)
      return {
        ...item,
        community: communi ? communi.name : item.communityCode,
        code: item.communityCode
      }
    })

    const communitiesCategoriesLabelValue = updatedArray.flatMap(({ community, code, names }) => [
      {
        label: community,
        value: community,
        key: `${community}-section`,
        inputLabel: community,
        color: 'gray',
      },
      ...names.map((name: string) => ({
        label: name,
        value: { item: name, parent: code },
        parent: `${community}-section`
      }))
    ])

    setCommunitiesCategories(communitiesCategoriesLabelValue)
  }, [user.communitiesCategories])

  useEffect(() => {
    setCategories([...personalCategories, ...communitiesCategories])
  }, [personalCategories, communitiesCategories])

  const [target, setTarget] = useState('')
  const [targets, setTargets] = useState([
    { label: '', value: '' }
  ])

  useEffect(() => {
    const targetsLabelValue = user.communities.map((category: any) => ({
      label: category.name,
      value: category.name
    }))

    setTargets([{ label: 'Personal', value: 'Personal' }, ...targetsLabelValue])
  }, [user.communities])

  const [expense, setExpense] = useState<CommunityExpenseType>({
    communityCode: '',
    category: '',
    description: '',
    amount: 0,
    date: ''
  })

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)

  const addExpense = async () => {

    let date = formatISO(new Date())

    if (expense.communityCode === '') {

      const personalExpense: ExpenseType = {
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        date: date
      }
      console.log(personalExpense);

      const newExpense = await addPersonalExpenseToDB(personalExpense)

      if (newExpense) {

        const updatedExpenses = [newExpense, ...user.expenses]

        const updatedTotalPersonalExpenses = user.totalPersonalExpenses + newExpense.amount

        const updatedCategories = user.categories.map((category: any) => {
          if (category.name === newExpense.category) {
            category.total += newExpense.amount
          }
          return category
        })

        const updatedBudgets = user.budgets.map((budget: any) => {
          if (budget.category === newExpense.category) {
            budget.currentAmount += newExpense.amount
            updateAmountPersonalBudgetInDB(newExpense.category, budget.currentAmount)
          }
          return budget
        })

        setUser({
          ...user,
          expenses: updatedExpenses,
          totalPersonalExpenses: updatedTotalPersonalExpenses,
          categories: updatedCategories,
          budgets: updatedBudgets
        })

        Toast.show({
          type: "success",
          text1: "Expense added",
          text2: "Expense of " + expense.category + " was created successfully!",
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error adding expense",
          text2: "Error adding expense for " + expense.category,
          position: "top",
        });
      }

    } else {

      const communityExpense: CommunityExpenseType = {
        communityCode: expense.communityCode,
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        date: date
      }

      const newExpense = await addCommunityExpenseToDB(communityExpense)

      if (newExpense) {

        const updatedCommunitiesExpenses = [newExpense, ...user.communitiesExpenses]

        const updatedCommunitiesCategories = user.communitiesCategories.map((category: any) => {
          if (category.communityCode === newExpense.communityCode && category.name === newExpense.category) {
            category.total += newExpense.amount
          }
          return category
        })

        const updatedCommunities = user.communities.map((community: any) => {
          if (community.code === newExpense.communityCode) {
            community.total += newExpense.amount
          }
          return community
        })

        const updatedCommunitiesBudgets = user.communitiesBudgets.map((budget: any) => {

          if (budget.communityCode === newExpense.communityCode && budget.category === newExpense.category) {
            budget.currentAmount += newExpense.amount
            updateAmountCommunityBudgetInDB(newExpense.category, budget.currentAmount, newExpense.communityCode)

          }
          return budget
        })

        setUser({
          ...user,
          communities: updatedCommunities,
          communitiesExpenses: updatedCommunitiesExpenses,
          communitiesCategories: updatedCommunitiesCategories,
          communitiesBudgets: updatedCommunitiesBudgets
        })
        Toast.show({
          type: "success",
          text1: "Expense added",
          text2: "Expense of " + expense.category + " was created successfully!",
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error adding expense",
          text2: "Error adding expense for " + expense.category,
          position: "top",
        });
      }
    }

  }

  const addCategory = async () => {

    if (target === 'Personal') {

      const numberOfCategories = user.categories.reduce((sum: number, category: any) => ++sum, 0)
      const index = numberOfCategories - defaultCategoriesNum
      const color = customCategoriesColor[index]

      const newCategory = await addPersonalCategoryToDB(newCategoryName, color)

      if (newCategory) {
        newCategory.total = 0
        setUser({
          ...user,
          categories: [...user.categories, newCategory]
        })
        setShowNewCategoryModal(false)
        Toast.show({
          type: "success",
          text1: "Category created",
          text2: "Category " + newCategoryName + " was created successfully!",
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error creating category",
          text2: "Error creating category " + newCategoryName,
          position: "top",
        });
      }
    } else {

      const communityCode = user.communities.find((community: any) => community.name === target).code

      const index = user.communitiesCategories.reduce((sum: number, category: any) => {
        if (category.communityCode === communityCode)
          return ++sum
        return sum
      }, 0)

      const color = customCategoriesColor[index]

      const newCategory = await addCommunityCategoryToDB(communityCode, newCategoryName, color)

      if (newCategory) {
        newCategory.total = 0

        setUser({
          ...user,
          communitiesCategories: [...user.communitiesCategories, newCategory]
        })
        setShowNewCategoryModal(false)
        Toast.show({
          type: "success",
          text1: "Category created",
          text2: "Category " + newCategoryName + " was created successfully!",
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error creating category",
          text2: "Error creating category " + newCategoryName,
          position: "top",
        });
      }
    }
  }

  const pickImage = async () => {

    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted === false) {
        alert("Permission to access gallery is required!")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        base64: true
      })

      if (result.canceled)
        return undefined

      const image = result.assets[0];

      return image

    } catch (error) {
      console.error(error);
    }
  }

  const scanReceipt = async () => {
    
    try{
      const image = await pickImage()
      
      const text = await postToGemini(image?.base64, image?.mimeType)
      
      console.log('image picked')
    }catch(err){

    }
  }

  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <View className="flex-1 bg-red-500 relative">
        <View className="flex-1 justify-center items-center mt-12">
          <View className="flex-row items-center border-b border-white pb-2 w-3/4">
            <Text className="text-white text-3xl">$</Text>
            <TextInput
              className="flex-1 text-white text-4xl ml-2"
              keyboardType="numeric"
              value={`${expense.amount}`}
              onChangeText={(input) => {
                const amount = input ? parseFloat(input) : 0
                setExpense({ ...expense, amount: amount })
              }}
              placeholder="0"
              placeholderTextColor="#ffffff88"
            />
          </View>
        </View>

        <View className="bg-white rounded-t-3xl p-6">
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-gray-500">Category</Text>
            <TouchableOpacity
              onPress={() => setShowNewCategoryModal(true)}
            >
              <Text className="text-violet font-semibold">
                + Add New Category
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            {categories.length > 0 ?
              (<RNPickerSelect
                onValueChange={(input) => {
                  if (input) {
                    if (typeof input === "object")
                      setExpense({ ...expense, category: input.item, communityCode: input.parent })
                    else
                      setExpense({ ...expense, category: input, communityCode: '' })
                  }
                }}
                items={categories}
                placeholder={{
                  label: 'Select a Category',
                  value: null,
                  color: '#9CA3AF',
                }}
                style={{
                  inputAndroid: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 12,
                    color: '#6B7280',
                  },
                }}
              />
              ) : (
                <Text>Loading categories...</Text>
              )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 mb-2">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-gray-700"
              placeholder="Enter description"
              placeholderTextColor="#9CA3AF"
              value={expense.description}
              onChangeText={(input) => setExpense({ ...expense, description: input })}
            />
          </View>

          <TouchableOpacity
            className="bg-violet p-4 rounded-lg mt-6"
            onPress={() => addExpense()}
          >
            <Text className="text-white text-center text-lg font-bold">
              Add expense
            </Text>
          </TouchableOpacity>

          {/*<View>
            <TouchableOpacity
              className='flex-row items-center gap-2 bg-cyan-700'
              onPress={() => scanReceipt()}
              activeOpacity={0.6}
            >
              <Ionicons name="scan" size={30} color="black" />
              <Text className='font-pmedium'>Scan receipt</Text>
            </TouchableOpacity>
          </View>*/}

        </View>
      </View>

      <Modal
        transparent
        animationType="slide"
        visible={showNewCategoryModal}
        onRequestClose={() => setShowNewCategoryModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-64 p-6 bg-white rounded-xl">
            <Text className="text-lg font-semibold text-gray-700 mb-3">
              Add New Category
            </Text>
            <View>
              <RNPickerSelect
                onValueChange={(input) => setTarget(input)}
                items={targets}
                placeholder={{
                  label: 'Select a Category',
                  value: null,
                  color: '#9CA3AF',
                }}
                style={{
                  inputAndroid: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 12,
                    color: '#6B7280',
                  },
                }}
              />
            </View>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-3"
              placeholder="Category Name"
              placeholderTextColor="#9CA3AF"
              value={newCategoryName}
              onChangeText={(input) => setNewCategoryName(input)}
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 p-2 rounded-md"
                onPress={() => setShowNewCategoryModal(false)}
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-violet p-2 rounded-md"
                onPress={() => addCategory()}
              >
                <Text className="text-white">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default Add
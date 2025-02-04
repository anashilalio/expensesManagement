import { Text, View, TouchableOpacity, Switch, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useAuth } from '../AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import { BudgetType, CommunityBudgetType } from '@/types/types';
import { formatISO } from 'date-fns';
import { addCommunityBudgetToDB, addPersonalBudgetToDB } from '@/api/budget';
import Toast from 'react-native-toast-message';

type CreateBudgetPageProps = {
  onBack: () => void;
};

const CreateBudgetPage: React.FC<CreateBudgetPageProps> = ({ onBack }) => {

  const { user, setUser } = useAuth()

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

  const [budget, setBudget] = useState<CommunityBudgetType>({
    communityCode: '',
    category: '',
    maxAmount: 0,
    currentAmount: 0,
    date: ''
  })

  const [receiveAlert, setReceiveAlert] = useState(false);
  const [alertPercentage, setAlertPercentage] = useState<number>(80);

  const handleSliderChange = useCallback(
    debounce((value: number) => {
      setAlertPercentage(Math.round(value));
    }, 100),
    []
  );

  const getTotalOfCategory = () => {
    console.log(user.categories);
    console.log(budget);

    if (budget.communityCode === '') {
      return user.categories.find((category: any) => category.name === budget.category).total
    } else {
      return user.communitiesCategories.find((category: any) =>
        category.name === budget.category && category.communityCode === budget.communityCode).total
    }
  }

  const addBudget = async () => {

    let date = formatISO(new Date())
    const currentAmount = getTotalOfCategory()
    setBudget({ ...budget, date: date, currentAmount: getTotalOfCategory() })

    if (budget.communityCode === '') {

      const personalBudget: BudgetType = {
        category: budget.category,
        maxAmount: budget.maxAmount,
        currentAmount: getTotalOfCategory(),
        date: date
      }

      const newBudget = await addPersonalBudgetToDB(personalBudget)

      if (newBudget) {

        const updatedBudgets = [newBudget, ...user.budgets];
        setUser({
          ...user,
          budgets: updatedBudgets,
        })

        Toast.show({
          type: "success",
          text1: "Budget Created",
          text2: "Budget for" + budget.category + " was created successfully!",
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error creating budget",
          text2: "Error creating budget for" + budget.category,
          position: "top",
        });
      }
      onBack()
    } else {

      const newBudget = await addCommunityBudgetToDB(budget)
      if (newBudget) {
        const updatedBudgets = [newBudget, ...user.communitiesBudgets];
        setUser({
          ...user,
          communitiesBudgets: updatedBudgets,
        })

        Toast.show({
          type: "success",
          text1: "Budget Created",
          text2: "Budget for" + budget.category + " was created successfully!",
          position: "top",
        });

      } else {
        Toast.show({
          type: "error",
          text1: "Error creating budget",
          text2: "Error creating budget for" + budget.category,
          position: "top",
        });
      }
      onBack()
    }
  }

  return (
    <View className="flex-1 bg-violet">

      <View className="flex-row items-center justify-between pt-10 px-5 h-24 w-full">
        <TouchableOpacity onPress={onBack}>
          <Text className="text-white text-3xl font-bold ">&lt;</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold text-center">Create Budget</Text>
        <View>
          <Text style={{display: "none"}}>&lt;</Text>
        </View>
      </View>

      <View className="flex-1 justify-center items-center mt-12 mb-8">
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
            value={`${budget.maxAmount}`}
            onChangeText={(input) => {
              const maxAmount = input ? parseFloat(input) : 0;
              setBudget({ ...budget, maxAmount })
            }}
          />

        </View>
      </View>

      <View className="bg-white rounded-t-3xl p-5">
        <View className="mb-4">
          <RNPickerSelect
            onValueChange={(input) => {
              if (input) {
                if (typeof input === "object")
                  setBudget({ ...budget, category: input.item, communityCode: input.parent })
                else
                  setBudget({ ...budget, category: input, communityCode: '' })
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

        <TouchableOpacity
          className="bg-violet rounded-lg py-4 mt-6"
          onPress={() => addBudget()}
        >
          <Text className="text-white text-center text-lg font-bold">Add budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateBudgetPage;

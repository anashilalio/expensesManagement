import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Platform,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../AuthContext';
import { BudgetType, CommnunityType } from '@/types/types';
import { formatISO } from 'date-fns';
import { addExpenseToDB } from '@/api/expense';
import { addCommunityToDB } from '@/api/community';

type AddCommunityProps = {
  onBack: () => void;
};

const AddCommunity: React.FC<AddCommunityProps> = ({ onBack }) => {

  const { user, setUser } = useAuth()

  const [community, setCommunity] = useState<CommnunityType>({
    name: '',
    description: '',
    members: []
  });

  const [isPrivate, setIsPrivate] = useState(false);
  const [categories, setCategories] = useState<any>([
    { label: '', value: '' }
  ]);
  const [budget, setBudget] = useState<BudgetType>({
    category: '',
    maxAmount: 0,
    currentAmount: 0,
    date: ''
  })

  useEffect(() => {
    const categoriesLabelValue = user.categories.map((category: any) => ({
      label: category.name,
      value: category.name
    }))
    setCategories(categoriesLabelValue)
  }, [user.categories])

  const checkIfCommunityExit = () => {

    if (!user.communities)
      return true

    let isDefined = user.communities.find((userCommunity: any) => userCommunity.name === community.name)
    if (isDefined)
      return false

    return true
  }

  const addCommunity = async () => {

    if (!checkIfCommunityExit())
      return

    setCommunity({
      ...community,
      members: []
    })

    const newCommunity = await addCommunityToDB(community)
    console.log(newCommunity);

    if (newCommunity) {

      const userCommunities = [...user.communities, newCommunity];

      setUser({
        ...user,
        communities: userCommunities
      })

    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={onBack}
            className="p-2 mr-3 rounded-full bg-gray-200"
          >
            <Text className="text-gray-600">&larr;</Text>
          </TouchableOpacity>
          <Text className="flex-1 text-center text-xl font-semibold text-gray-900">
            Create Community
          </Text>
          <View className="w-8" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <View className="bg-white rounded-2xl p-4 shadow shadow-gray-300 mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                Community Details
              </Text>

              <Text className="text-base text-gray-700 mb-1">Name</Text>
              <TextInput
                className="mb-4 h-12 border border-gray-300 rounded-lg px-3 text-gray-800"
                placeholder="Awesome Community"
                placeholderTextColor="#999"
                value={community.name}
                onChangeText={(input) => setCommunity({ ...community, name: input })}
              />

              <Text className="text-base text-gray-700 mb-1">Description</Text>
              <TextInput
                className="mb-4 h-20 border border-gray-300 rounded-lg px-3 text-gray-800"
                placeholder="What's your community about?"
                placeholderTextColor="#999"
                value={community.description}
                onChangeText={(input) => setCommunity({ ...community, description: input })}
                multiline
              />

              {/* <View className="flex-row items-center justify-between mt-2">
                <Text className="text-base text-gray-700">
                  Private Community
                </Text>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#A78BFA' }}
                  thumbColor={isPrivate ? '#6366F1' : '#f4f3f4'}
                  ios_backgroundColor="#E5E7EB"
                  value={isPrivate}
                  onValueChange={setIsPrivate}
                />
              </View> */}
              <View>
                <TextInput
                  placeholder='Budget'
                  keyboardType="numeric"

                />
              </View>
              <View>
                <RNPickerSelect
                  onValueChange={(input) => setBudget({ ...budget, category: input })}
                  items={categories}
                  placeholder={{
                    label: 'Select a Category',
                    value: null,
                    color: '#9CA3AF',
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => addCommunity()}
              className="bg-violet rounded-lg py-4 mt-2"
            >
              <Text className="text-center text-white font-semibold text-base">
                Create Community
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AddCommunity;

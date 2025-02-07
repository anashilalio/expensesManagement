import React, { useMemo, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RecentExpenses from './RecentExpenses';
import TopPartExpenses from './TopPartExpenses';
import LowPartExpenses from './LowPartExpenses';
import { useAuth } from '../AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import { numberOfRecentExpenses } from '@/utils/constants';

interface CurrentCommunityType {
  name: string;
  code: string;
  total: number;
}
interface MyCommunitiesProps {
  currentMonthIndex: number;
  currentYear: number
}
const MyCommunities: React.FC<MyCommunitiesProps> = ({ currentMonthIndex, currentYear }) => {

  const { user } = useAuth();

  const [currentCommunity, setCurrentCommunity] = useState<CurrentCommunityType>({
    name: '',
    code: '',
    total: 0
  });
  const [currentCommunityCategories, setCurrentCommunityCategories] = useState<any[]>();
  const [communities, setCommunities] = useState<any>([{ label: '', value: '' }]);

  const updateCurrentCommunity = (name: string) => {
    const selectedCommunity = user.communities.find((community: any) => community.name === name);
    setCurrentCommunity(selectedCommunity);
  };

  useEffect(() => {
    if (user.communities.length === 0) return;
    const communitiesLabelValue = user.communities.map((community: any) => ({
      label: community.name,
      value: community.name
    }));
    setCommunities(communitiesLabelValue);
    const firstCommunityName = communitiesLabelValue[0]['label'];
    if (firstCommunityName) {
      updateCurrentCommunity(firstCommunityName);
    }
  }, [user.communities]);

  useEffect(() => {
    if (!currentCommunity?.code || user.communitiesCategories.length === 0) return;
    const communityCategories = user.communitiesCategories.filter((category: any) =>
      category.communityCode === currentCommunity.code
    );
    setCurrentCommunityCategories(communityCategories);
  }, [currentCommunity, user.communitiesCategories]);

  const filteredCommunityExpenses = useMemo(() => {
    if (!currentCommunity?.code) return [];
    const arr = user.communitiesExpenses.filter((expense: any) =>
      expense.communityCode === currentCommunity.code &&
      new Date(expense.date).getMonth() === currentMonthIndex &&
      new Date(expense.date).getFullYear() === currentYear
    );
    console.log("filteredCommunityExpenses");
    console.log(arr);

    return arr
  }, [user.communitiesExpenses, currentCommunity, currentMonthIndex, currentYear]);

  const totalCommunityExpensesForMonth = useMemo(() => {
    const tot = filteredCommunityExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
    console.log("totalCommunityExpensesForMonth");
    console.log(tot);

    return tot
  }, [filteredCommunityExpenses]);

  const monthRecentExpenses = useMemo(() => {
    const arr = filteredCommunityExpenses.slice(0, numberOfRecentExpenses)
    console.log("monthRecentExpenses");
    console.log(arr);

    return arr
  }, [filteredCommunityExpenses])

  const communityCategories = useMemo(() => {

    if (!currentCommunityCategories)
      return []

    let categoriesTotal = filteredCommunityExpenses.reduce((arr: any, expense: any) => {
      if (!arr[expense.category])
        arr[expense.category] = 0
      arr[expense.category] += expense.amount
      return arr
    }, {});

    console.log(categoriesTotal);
    console.log("communityCategories");

    const arr = currentCommunityCategories.map((category: any) => {
      return {
        ...category,
        total: categoriesTotal[category.name] || 0
      }
    })
    console.log(arr);

    return arr

  }, [currentCommunityCategories, filteredCommunityExpenses])

  if (user.communities.length === 0) {
    return (
      <View className='flex-col gap-4 mt-4'>
        <Text className='font-plight text-lg text-gray-400 text-center mt-8'>No Communities</Text>
      </View>
    );
  }

  if (currentCommunity.name.length === 0) {
    return (
      <Text>
        Loading...
      </Text>
    )
  }


  return (
    <View className="flex-1 gap-6">
      <View className='flex-1 rounded-full mt-6 bg-gray-50'>
        <RNPickerSelect
          onValueChange={(name) => updateCurrentCommunity(name)}
          items={communities}
          value={currentCommunity.name}
          placeholder={{
            label: 'Select a Category',
            value: null,
            color: '#9CA3AF'
          }}
        />
      </View>
      <View className="w-full border-4 border-gray-50 rounded-3xl flex-col p-6 gap-6">
        <TopPartExpenses totalExpenses={totalCommunityExpensesForMonth} currentMonthIndex={currentMonthIndex} currentYear={currentYear}  />
        <LowPartExpenses totalExpenses={totalCommunityExpensesForMonth} categories={communityCategories} />
      </View>
      <RecentExpenses expenses={monthRecentExpenses} categories={currentCommunityCategories} />
    </View>
  );
};

export default MyCommunities;

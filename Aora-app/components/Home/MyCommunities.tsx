import React, { useMemo, useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RecentExpenses from './RecentExpenses';
import TopPartExpenses from './TopPartExpenses';
import LowPartExpenses from './LowPartExpenses';
import { useAuth } from '../AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import { CommnunityCategoryType } from '@/types/types';
import { numberOfRecentExpenses } from '@/utils/constants';

interface CurrentCommunityType {
  name: string;
  code: string;
  total: number;
}
interface MyCommunitiesProps {
  currentMonthIndex: number;
}
const MyCommunities: React.FC<MyCommunitiesProps> = ({ currentMonthIndex }) => {

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
    return user.communitiesExpenses.filter((expense: any) =>
      expense.communityCode === currentCommunity.code &&
      new Date(expense.date).getMonth() === currentMonthIndex
    );
  }, [user.communitiesExpenses, currentCommunity, currentMonthIndex]);

  const totalCommunityExpensesForMonth = useMemo(() => {
    return filteredCommunityExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
  }, [filteredCommunityExpenses]);

  const monthRecentExpenses = useMemo(() => {
    return filteredCommunityExpenses.slice(0, numberOfRecentExpenses)
  }, [filteredCommunityExpenses])

  const communityCategories =  useMemo(() => {

    if (!currentCommunityCategories)
      return []

    let categoriesTotal = filteredCommunityExpenses.reduce((arr: any, expense: any) => {
      if (!arr[expense.category])
        arr[expense.category] = 0
      arr[expense.category] += expense.amount
      return arr
    }, {});

    console.log(categoriesTotal);
    
    return currentCommunityCategories.map((category: any) => {
      return {
        ...category,
        currentMonthTotal: categoriesTotal[category.name] || 0
      }
    })

  }, [filteredCommunityExpenses, currentCommunityCategories])
  
  if (user.communities.length === 0) {
    return (
      <View>
        <Text>Join a Community</Text>
      </View>
    );
  }

  if(currentCommunity.name.length === 0){
    return(
      <Text>
        Loading...
      </Text>
    )
  }

  return (
    <View className="flex-1 gap-6">
      <View>
        <RNPickerSelect
          onValueChange={(name) => updateCurrentCommunity(name)}
          items={communities}
          value={currentCommunity.name}
          placeholder={{
            label: 'Select a Category',
            value: null,
            color: '#9CA3AF'
          }}
          style={{
            inputAndroid: {
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              borderColor: '#E5E7EB',
              borderWidth: 1,
              padding: 12,
              color: '#6B7280'
            }
          }}
        />
      </View>
      <View className="w-full border-4 border-gray-50 rounded-3xl flex-col mt-6 p-6 gap-6">
        <TopPartExpenses totalExpenses={totalCommunityExpensesForMonth} />
        <LowPartExpenses totalExpenses={totalCommunityExpensesForMonth} categories={communityCategories} />
      </View>
      <RecentExpenses expenses={monthRecentExpenses} categories={currentCommunityCategories} />
    </View>
  );
};

export default MyCommunities;

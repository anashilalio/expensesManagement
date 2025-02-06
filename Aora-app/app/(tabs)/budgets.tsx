import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CreateBudgetPage from '../../components/Budget/CreateBudgetPage';
import ItemBudget from '../../components/Budget/itemBudget';
import BudgetDetails from '@/components/Budget/BudgetDetails';
import { useAuth } from '@/components/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Budgets = () => {
  const [showCreateBudgetPage, setShowCreateBudgetPage] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const { user } = useAuth();

  const budgetsList: React.JSX.Element[] | React.JSX.Element = useMemo(() => {
    if (user.budgets.length === 0 && user.communitiesBudgets.length === 0) {
      return (
        <Text className="text-center font-plight text-text-gray">
          No budgets
        </Text>
      );
    }

    const budgets = [...user.budgets, ...user.communitiesBudgets]

    return budgets.map((budget: any, index: number) => {
      let color = ''

      if(budget.communityCode){
        color = user.communitiesCategories.find((category: any) => 
          category.communityCode === budget.communityCode && category.name === budget.category).color
      }else{
        color = user.categories.find((category: any) => category.name === budget.category).color
      }
      return (<TouchableOpacity key={index} onPress={() => setSelectedBudget(budget)}>
        <ItemBudget
          category={budget.category}
          current={budget.currentAmount}
          max={budget.maxAmount}
          color={color}
        />
      </TouchableOpacity>)
    });
  }, [user.budgets, user.communitiesBudgets]);

  let content;

  if (showCreateBudgetPage) {
    content = <CreateBudgetPage onBack={() => setShowCreateBudgetPage(false)} />;
  } else if (selectedBudget) {
    content = <BudgetDetails budget={selectedBudget} onBack={() => setSelectedBudget(null)} />;
  } else {
    content = (
      <View className='px-6 py-4 flex-1'>
        <View className="mb-6 flex-row justify-end">
          <TouchableOpacity
            onPress={() => setShowCreateBudgetPage(true)}
          >
            <Text className="text-violet font-semibold">
              + Add New Budget
            </Text>
          </TouchableOpacity>
        </View>
        <View className='flex-col gap-6'>
          {budgetsList}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <ScrollView className='flex-1'>
        {content}
      </ScrollView>
    </SafeAreaView>
  )
};

export default Budgets;

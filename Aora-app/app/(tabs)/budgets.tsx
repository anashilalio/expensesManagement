import { Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CreateBudgetPage from '../../components/Budget/CreateBudgetPage';
import ItemBudget from '../../components/Budget/itemBudget';
import BudgetDetails from '@/components/Budget/BudgetDetails';
import { useAuth } from '@/components/AuthContext';

const Budgets = () => {
  const [showCreateBudgetPage, setShowCreateBudgetPage] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const { user } = useAuth();

  const budgets = useMemo(() => {
    if (!user) return [];

    const communityBudgetsArray = Array.isArray(user.communitiesBudgets)
      ? user.communitiesBudgets
      : user.communitiesBudgets
      ? [user.communitiesBudgets]
      : [];

    return [...(user.budgets || []), ...communityBudgetsArray];
  }, [user]);

  useEffect(() => {
    console.log('Budgets:', budgets);
  }, [budgets]);

  const budgetsList = useMemo(() => {
    if (!budgets || budgets.length === 0) {
      return (
        <Text className="text-center font-plight text-text-gray">
          No budgets
        </Text>
      );
    }

    return budgets.map((budget, index) => (
      <TouchableOpacity key={index} onPress={() => setSelectedBudget(budget)}>
        <ItemBudget
          category={budget.category}
          current={budget.currentAmount}
          max={budget.maxAmount}
        />
      </TouchableOpacity>
    ));
  }, [budgets]);

  let content;

  if (showCreateBudgetPage) {
    content = <CreateBudgetPage onBack={() => setShowCreateBudgetPage(false)} />;
  } else if (selectedBudget) {
    content = <BudgetDetails budget={selectedBudget} onBack={() => setSelectedBudget(null)} />;
  } else {
    content = (
      <>
        <TouchableOpacity
          className="bg-violet rounded-lg flex-row py-4 justify-center items-center"
          onPress={() => setShowCreateBudgetPage(true)}
        >
          <Text className="text-white text-lg font-bold bg-violet">
            Create a Budget
          </Text>
        </TouchableOpacity>

        <View className="flex-1 bg-violet">
          <View className="flex-1 bg-gray-100 rounded-t-3xl items-center px-8 mt-8">
            {budgetsList}
          </View>
        </View>

        <View className="px-5 pb-5 bg-white" />
      </>
    );
  }

  return <View className="flex-1 bg-violet pt-12">{content}</View>;
};

export default Budgets;

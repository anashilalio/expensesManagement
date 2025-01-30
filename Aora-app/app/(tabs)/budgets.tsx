import { Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CreateBudgetPage from '../../components/Budget/CreateBudgetPage';
import ItemBudget from '../../components/Budget/itemBudget'
import BudgetDetails from '@/components/Budget/BudgetDetails';
import { useAuth } from '@/components/AuthContext';

const Budgets = () => {
  const [showCreateBudgetPage, setShowCreateBudgetPage] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);

  const { user } = useAuth()

  const budgets = useMemo(() => {
    return [...user.budgets, user.communitiesBudgets]
  }, [user.budgets, user.communitiesBudgets])

  useEffect(() => {
    console.log(budgets);

  }, budgets)
  if (showCreateBudgetPage) {
    return <CreateBudgetPage onBack={() => setShowCreateBudgetPage(false)} />;
  }
  if (selectedBudget) {
    return <BudgetDetails budget={selectedBudget} onBack={() => setSelectedBudget(null)} />
  }

  const budgetsList = useMemo(() => {
    return budgets.length > 0 ?
      budgets.map((budget: any, index: number) => {
        return (
          <TouchableOpacity key={index} onPress={() => setSelectedBudget(budget)}>
            <ItemBudget category={budget.category} current={budget.currentAmount} max={budget.maxAmount} />
          </TouchableOpacity>
        );
      })
      :
      <Text className='text-center font-plight text-text-gray'>
        No budgets
      </Text>
  }, budgets)

  return (
    <View className="flex-1 bg-violet">

      <TouchableOpacity
        className="bg-violet rounded-lg flex-row py-4 justify-center items-center"
        onPress={() => setShowCreateBudgetPage(true)}
      >
        <Text className="text-white text-lg font-bold bg-violet">Create a Budget</Text>
        <Text></Text>
      </TouchableOpacity>

      <View className="flex-1 bg-violet">

        <View className="flex-1 bg-gray-100 rounded-t-3xl  items-center  px-8 mt-8">
          {budgetsList}
        </View>

      </View>

      <View className="px-5 pb-5 bg-white">

      </View>
    </View>
  );
};

export default Budgets;

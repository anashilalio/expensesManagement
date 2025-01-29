import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CreateBudgetPage from '../../components/Budget/CreateBudgetPage';
import ItemBudget from '../../components/Budget/itemBudget'
import BudgetDetails from '@/components/Budget/BudgetDetails';
type BudgetType = {
  category: string;
  spend: string;
  max: string;
};
const Budgets = () => {
  const [showCreateBudgetPage, setShowCreateBudgetPage] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [selectedBudget, setSelectedBudget] = useState<BudgetType | null>(null);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ];
  const Budgets = {
    data : [
      {
        "category" : "shopping" , 
        "spend" : "100" , 
        "max" : "1200"
      },
      {
        "category" : "shopping" , 
        "spend" : "200" , 
        "max" : "1200"
      },
    ]
    
  }
  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % 12);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + 12) % 12);
  };
  if (showCreateBudgetPage) {
    return <CreateBudgetPage onBack={() => setShowCreateBudgetPage(false)} />;
  }
  if(selectedBudget){
    return <BudgetDetails budget={selectedBudget} onBack={()=>setSelectedBudget(null)}/>
  }

  return (
    <View className="flex-1 bg-violet">
      <View className="flex-row justify-between items-center pt-5 px-5 h-44">
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text className="text-white text-xl font-bold">&lt;</Text>
        </TouchableOpacity>
        <Text className=" mx-2 text-white text-xl font-bold" >{months[currentMonthIndex]}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text className="text-white text-xl font-bold">&gt;</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
          className="bg-violet rounded-lg flex-row py-4 justify-center items-center"
          onPress={() => setShowCreateBudgetPage(true)}
        >
          <Text className="text-white text-lg font-bold bg-violet">Create a Budget</Text>
          <Text></Text>
        </TouchableOpacity>
      <View className="flex-1 bg-violet">
        <View className="flex-1 bg-gray-100 rounded-t-3xl  items-center  px-8 mt-8">
          {Budgets.data.map((bg , index)=>{
              return  <TouchableOpacity key={index} onPress={()=>setSelectedBudget(bg)}>
                  <ItemBudget category={bg.category} spend={bg.spend} max={bg.max} />
                </TouchableOpacity> ;  
          })}
         
            

        </View>
      </View>

      <View className="px-5 pb-5 bg-white">
        
      </View>
    </View>
  );
};

export default Budgets;

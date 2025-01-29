import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons' 
interface BudgetType {
    spend: string
    max: string
    category : string
   
  }
  
  interface BudgetDetailsProps {
    budget: BudgetType | null
    onBack: () => void
    
  } 
const BudgetDetails:React.FC<BudgetDetailsProps> = ({budget , onBack}) => {
  return (
    <SafeAreaView>
        <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity 
                  onPress={onBack}
                  className="p-2 bg-white rounded-full shadow-sm"
                  style={{ elevation: 2 }}
                >
                  <Icon name="arrow-back" size={24} color="#4b5563" />
                </TouchableOpacity>
        </View>
      <Text>{budget?.category}</Text>
      <Text>{budget?.spend}</Text>

      <Text>{budget?.max}</Text>

    </SafeAreaView>
  )
}

export default BudgetDetails

const styles = StyleSheet.create({})
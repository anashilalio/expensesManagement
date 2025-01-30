import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const itemBudget = ({category , current , max}) => {
    const remaining = max - current ; 
    const percentageSpent = current / max  ;
  return (
    <View className='bg-white  shadow-lg gap-2 rounded-xl py-4 mt-4  w-full mx-16 flex justify-center px-12'>
      <View className='flex flex-row items-center gap-2'>
        <View className='bg-violet size-4 rounded-full'></View>
      <Text className='text-gray-600'>
        {category}
      </Text>

      </View>
      <View> 
        <Text className='text-2xl font-bold'>
        Remaining ${remaining}

        </Text></View>
      <View>
      <Text className='text-gray-500'>${current} of ${max} </Text>
      
      </View>
      <View className='overflow-hidden w-full bg-gray-100 rounded-xl '>
      <View className=" bg-violet h-4 " style={{width : `${percentageSpent *100 }%`}}></View>
      </View>   
    </View>
  )
}

export default itemBudget

const styles = StyleSheet.create({})
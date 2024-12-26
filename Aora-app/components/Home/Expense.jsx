import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Expense = ({name , spent , details}) => {
  return (
    <View className="p-4 border-gray-50 border-4 rounded-3xl flex-row justify-around mt-12">
            <View className="justify-center">Icon</View>
            <View className='w-3/4 flex gap-8'>
                <View className='flex-row justify-between'>
                    <View className='text-xl font-bold'>{name}</View>
                    <View className='text-red-600'>-${spent}</View>
                </View>
                <View className='flex-row justify-between '>
                    <View className='text-left'>{details}</View>
                    <View className='text-rigth text-gray-300'>10:00 AM</View>

                </View>

            </View>
        </View>
  )
}

export default Expense

const styles = StyleSheet.create({})
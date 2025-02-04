import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { categoryIcons } from '@/utils/IconMapping';
import { useAuth } from '../AuthContext';
import tinycolor from 'tinycolor2';

const itemBudget = ({ category, current, max }) => {
  const remaining = max - current;
  const percentageSpent = current / max * 100;
  const Icon = categoryIcons[category] || categoryIcons["default"]

  const { user } = useAuth()

  const color = useMemo(() => {
    const arr = [...user.categories, ...user.communitiesCategories]
    return arr.find((categ) => categ.name === category).color
  }, [category])

  const backgroundColor = useMemo(() => {
    let degree = 30
    switch (category) {
      case "Transport":
        degree = 50
        break;
      case "Food":
        degree = 45
        break;
      case "Shopping":
        degree = 29
        break;
      case "Entertainment":
        degree = 50
        break;
      default:
        break;
    }
    console.log(color);

    return tinycolor(color).lighten(degree).toString();
  }, [color])

  return (
    <View className='shadow-lg rounded-xl w-full px-5 py-3' style={{ backgroundColor }}>

      <View className='flex-row items-center'>
        <Icon size={30} />
        <Text className='font-psemibold'>
          {category}
        </Text>
      </View>


      <View className="w-full h-8 bg-gray-200 rounded-full my-2">
        <View
          className="h-full rounded-full items-end justify-center pr-3"
          style={{
            backgroundColor: color,
            width: `${percentageSpent}%`
          }}
        >
          <Text
            className='text-white font-psemibold'
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {percentageSpent > 0 ? percentageSpent.toFixed(2) : ''}%
          </Text>
        </View>
      </View>

      <View
        className='flex-row justify-between'
      >
        <Text className='font-pmedium '>
          ${current}
        </Text>
        <Text className='font-pmedium'>
          ${max}
        </Text>
      </View>
    </View>
  )
}

export default itemBudget

const styles = StyleSheet.create({})
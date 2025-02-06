import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { categoryIcons } from '@/utils/IconMapping';
import { useAuth } from '../AuthContext';
import tinycolor from 'tinycolor2';

const itemBudget = ({ category, current, max, color }) => {

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false, // Shadow properties can't use native driver
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [glowAnim]);

  const shadowInterpolation = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 10], // Shadow radius grows and shrinks
  });

  const [barWidth, setBarWidth] = useState(0);

  const percentageSpent = current / max * 100;

  const categoryIconName = categoryIcons[category] ? category : "default"
  const Icon = categoryIcons[categoryIconName]

  const { user } = useAuth()

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
        {
          categoryIconName === "default"
            ? <Icon size={30} color={color} />
            : <Icon size={30} />
        }
        <Text className='font-psemibold'>
          {category}
        </Text>
      </View>


      <View className="w-full h-8 bg-gray-200 rounded-full my-2 flex-row items-center gap-3">
        <View
          className="h-full rounded-full items-end justify-center pr-3"
          style={{
            backgroundColor: color,
            width: `${Math.min(percentageSpent, 100)}%`
          }}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setBarWidth(width)
          }}
        >
          <Text
            className='text-white font-psemibold'
          >
            {
              barWidth >= 60
                ? (
                  percentageSpent > 100
                    ?
                    <Animated.Text
                      style={[
                        styles.glowingText,
                        {
                          textShadowRadius: shadowInterpolation,
                        },
                      ]}
                    >
                      ${percentageSpent.toFixed(2)}%
                    </Animated.Text>
                    : 
                    `${percentageSpent.toFixed(2)}%`
                )
                : ''
            }
          </Text>
        </View>
        <Text
          className='font-pbold'
          style={{ color }}
        >
          {barWidth < 60 ? `${percentageSpent.toFixed(2)}%` : ''}
        </Text>
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

const styles = StyleSheet.create({
  glowingText: {
    color: 'red',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
  },
});
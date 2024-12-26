import React from 'react'
import { router, Stack, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import GoBackArrow from '../../assets/icons/arrow-left.png'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const AuthLayout = () => {
  const barMarginTop = "mt-7"
  
  const navigation = useNavigation();
  const imageStyle = `w-11 h-11 ${barMarginTop}`
  const titleStyle = `text-text-dark font-psemibold text-xl w-full text-center ${barMarginTop}`

  return (
    <>
      <Stack>
          <Stack.Screen
            name='login'
            options={{
              title: '',
              headerShown: true,
              headerShadowVisible: false,
              headerTitle: () => (
                <Text className={titleStyle}>
                  Login
                </Text>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Image source={GoBackArrow} className={imageStyle}/>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View className={imageStyle}></View>
              )
            }}/>
          <Stack.Screen
            name='sign-up'
            options={{
              title: '',
              headerShown: true,
              headerShadowVisible: false,
              headerTitle: () => (
                <Text className={titleStyle}>
                  Sign Up
                </Text>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Image source={GoBackArrow} className={imageStyle}/>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View className={imageStyle}></View>
              )
            }}
          />
      </Stack>
    </>
  )
}

export default AuthLayout
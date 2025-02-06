import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import User from "../../assets/images/user.jpeg"
import Setting from '@/components/Profile/Setting'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileSetting from '../../components/Profile/Profile'
import ExportData from '@/components/Profile/ExportData'
import Currency from '@/components/Profile/Currency'
import { useAuth } from '@/components/AuthContext'
import { router } from 'expo-router'
import { logoutUser } from '@/api/auth'

const Profile = () => {

  const [showProfile, setShowProfile] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showExportData, setShowExportData] = useState(false);
  const { user, setUser } = useAuth()
  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: logout }
      ],
      { cancelable: true }
    );
  };

  const logout = async () => {

    const loggedOut = await logoutUser()

    if (loggedOut) {
      setUser(null)
      router.replace("/(auth)/login")
    }

  }

  if (showProfile) {
    return <ProfileSetting onBack={() => setShowProfile(false)} />
  }
  if (showCurrency) {
    return <Currency onBack={() => setShowCurrency(false)} />
  }
  if (showExportData) {
    return <ExportData onBack={() => setShowExportData(false)} />
  }
  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <ScrollView>
        <View className=' flex-col gap-6 px-8 pt-8 my-6'>

          <View className='flex-col items-center gap-3'>
            <Image source={User} className='rounded-full w-28 h-28' resizeMode='contain' />
            <Text className='text-center text-title font-psemibold text-xl'>{user.user.username}</Text>
            <Text className='text-center text-subtitle font-pregular text-base'>ID: {user.user._id}</Text>
          </View>

          <View className='flex-col mt-6'>
            <TouchableOpacity onPress={() => setShowProfile(true)}>
              <Setting
                title='Edit profile'
                details='Change profile image, username, password'
                icon='Profile'
              />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCurrency(true)}>
              <Setting
                title='Currency'
                details='Change currency'
                icon='Currency'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowExportData(true)}>
              <Setting
                title='Export Data'
                details='Export your expenses information as csv'
                icon='Export'
              />
            </TouchableOpacity>

          </View>

          <View className='flex-1 items-center mt-6'>
            <TouchableOpacity className='bg-red-100 p-4 rounded-2xl w-1/3' onPress={() => confirmLogout()}>
              <Text className='text-tomato-primary font-psemibold text-base text-center'>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
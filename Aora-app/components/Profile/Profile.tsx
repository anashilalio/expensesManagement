import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../AuthContext'
import { updateUser } from '@/api/user'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'

interface ProfileProps {
  onBack: () => void
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {

  const { user, setUser } = useAuth()

  const [username, setUsername] = useState(user.user.username)
  const [email, setEmail] = useState(user.user.email)

  const [isEditing, setIsEditing] = useState(false)

  const updateUserInfo = async () => {
    const updated = await updateUser(username, email)
    if (updated) {
      setUser({
        ...user,
        user: { ...user.user, email, username }
      })
      Toast.show({
        type: "success",
        text1: "User updated",
        text2: "User was updated successfully!",
        position: "top",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error updating User",
        text2: "Error updating User",
        position: "top",
      });
    }
    onBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        <View className="w-full flex-row justify-between items-center my-6 px-4">
          <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
            <Icon name="arrow-back" size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Profile Settings</Text>
          <View className="w-12" />
        </View>

        <View className="px-4 my-6">
          <View className="mb-4 my-4">
            <Text className="mb-1 text-gray-700 font-medium">Username</Text>
            <View className="flex-row items-center">
              {isEditing ? (
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your full name"
                  className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex-1"
                />
              ) : (
                <Text className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
                  {username}
                </Text>
              )}
            </View>
          </View>

          <View className="mb-4 my-4">
            <Text className="mb-1 text-gray-700 font-medium">Email</Text>
            <View className="flex-row items-center">
              {isEditing ? (
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your full name"
                  className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex-1"
                />
              ) : (
                <Text className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
                  {email}
                </Text>
              )}
            </View>
            {isEditing ? (
              <TouchableOpacity
                className="bg-white p-4 rounded-lg mt-6 border-2 border-violet"
                onPress={() => updateUserInfo()}
              >
                <Text className="text-violet text-center text-lg font-bold">
                  Save
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-violet p-4 rounded-lg mt-6"
                onPress={() => setIsEditing(!isEditing)}
              >
                <Text className="text-white text-center text-lg font-bold">
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

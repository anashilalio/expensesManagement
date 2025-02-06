import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../AuthContext'

interface ProfileProps {
  onBack: () => void
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {

  const { user, setUser } = useAuth()

  const [username, setUsername] = useState(user.user.username)
  const [email, setEmail] = useState(user.user.email)

  const [isEditing, setIsEditing] = useState(false)

  const handleToggleEdit = () => {
    if (isEditing) {
    }
    setIsEditing(!isEditing)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        <View className="w-full flex-row justify-between items-center mb-6 px-4">
          <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
            <Icon name="arrow-back" size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Profile Settings</Text>
          <View className="w-12" />
        </View>

        <View className="px-4">
          <View className="mb-4">
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
              <TouchableOpacity
                onPress={handleToggleEdit}
                className="ml-2 p-2 bg-violet rounded-full shadow-md"
              >
                {isEditing ? (
                  <Icon name="check" size={20} color="#fff" />
                ) : (
                  <Icon name="edit" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <Text className="mb-1 text-gray-700 font-medium">Email</Text>
            <View className="p-3 bg-gray-200 rounded-lg shadow-sm border border-gray-200">
              <Text className="text-gray-600">{email}</Text>
            </View>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

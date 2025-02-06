import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
interface ShowNotificationProps {
    onBack : ()=>void 
}
const Notification:React.FC<ShowNotificationProps>  =({onBack}) => {
  return (
    <SafeAreaView>
         <View className="w-full flex-row justify-between items-center mb-5 ">
                <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
                  <Icon name="arrow-back" size={24} color="#4b5563" />
                </TouchableOpacity>   
              </View>
        
        <View className=" mx-4  rounded-xl  border-red-500 px-4 py-4 bg-red-400 ">
          <Text className='text-white'>
            ! : your budget is 90%
          </Text>
        </View>

        <View className=" mx-4  rounded-xl mt-10  px-4 py-4 bg-violet ">
          <Text className='text-white'>
            ! : you have being invited to Join a Coummunity
          </Text>
        </View>

        <View className=" mx-4  rounded-xl mt-10  px-4 py-4 bg-blue-600 ">
          <Text className='text-blue-500'>
            ! : you have being invited to Join a Coummunity
          </Text>
        </View>
      </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})
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
         <View className="w-full flex-row justify-between items-center mb-5">
                <TouchableOpacity onPress={onBack} className="p-3 bg-white rounded-full shadow-md">
                  <Icon name="arrow-back" size={24} color="#4b5563" />
                </TouchableOpacity>   
              </View>
        
      <Text>Notifications</Text>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import User from "../../assets/images/user.jpeg"
import Setting from '@/components/Profile/Setting'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileSetting from '../../components/Profile/Profile'
import ExportData from '@/components/Profile/ExportData'
import Currency from '@/components/Profile/Currency'
const Profile = () => {
  const [showProfile , setShowProfile] = useState(false);
  const [showCurrency , setShowCurrency ] = useState(false);
  const [showExportData , setShowExportData ] = useState(false);
  if(showProfile){
    return <ProfileSetting onBack={()=>setShowProfile(false)}/>
  }
  if(showCurrency){
    return <Currency onBack={()=>setShowCurrency(false)}/>
  }
  if(showExportData){
    return <ExportData onBack={()=>setShowExportData(false)}/>
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=' flex-col gap-6 px-8 pt-8'>

          <View className='flex-col items-center gap-3'>
            <Image source={User} className='rounded-full w-28 h-28' resizeMode='contain'/>
            <Text className='text-center text-title font-psemibold text-xl'>John Doe</Text>
            <Text className='text-center text-subtitle font-pregular text-base'>ID: 5sd8gt5h2</Text>
          </View>

          <View className='flex-col'>
            <TouchableOpacity onPress={()=>setShowProfile(true)}>
            <Setting 
              title='Edit profile'
              details='Change profile image, username, password'
              icon='Profile'
            />

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowCurrency(true)}>
            <Setting
              title='Currency'
              details='Change currency'
              icon='Currency'
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowExportData(true)}>
            <Setting
              title='Export Data'
              details='Export your expenses information as csv'
              icon='Export'
            />
            </TouchableOpacity>
              
          </View>

          <TouchableOpacity className='bg-tomato-secondary p-4 rounded-full'>
            <Text className='text-tomato-primary font-psemibold text-base'>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
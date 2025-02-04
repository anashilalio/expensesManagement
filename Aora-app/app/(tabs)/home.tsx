import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import React, { createContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Community from '@/components/community/Community'
import MyPersonnal from '@/components/Home/MyPersonnal'
import MyCommunities from '@/components/Home/MyCommunities'
import Notification from '@/components/Notification';

interface CurrencyContextType {
  currency: string
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: ''
})

const Home = () => {
  const [showCommunity, setShowCommunity] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [showNotification , setShowNotification ] = useState(false);
  const [isPersonnalVisible, setIsPersonnalVisible] = useState(true)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ];

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % 12);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + 12) % 12);
  };

  if (showCommunity) {
    return <Community onBack={() => setShowCommunity(false)} />
  }
if(showNotification){
  return <Notification onBack={()=>setShowNotification(false)}/>
}
  return (
    <SafeAreaView className='h-full w-full bg-white '>
      <ScrollView>

        {showMenu && (
          <View className="absolute top-0 left-0 h-full w-full bg-white z-50 pt-4 px-8">
            <TouchableOpacity className='z-51' onPress={() => setShowMenu((prev) => !prev)}>
              <Ionicons name="menu" className='z-51 text-black' size={24} color="black" />
            </TouchableOpacity>
            <View className='flex flex-col  h-full'>
              <View className='flex flex-col  h-2/4 justify-center'>
                <TouchableOpacity className="p-4  border-black">
                  <Text className="text-black text-xl">Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4  border-black" onPress={() => setShowCommunity(true)}>
                  <Text className="text-black text-xl">Community</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4  border-black">
                  <Text className="text-black text-xl">Settings</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="p-4  border-gray">
                <Text className="text-black text-xl">Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className='mx-6'>

          <View>
            <View className="flex-row justify-between items-center mt-4 px-4">
              <TouchableOpacity className='z-51' onPress={() => setShowMenu((prev) => !prev)}>
                <Ionicons name="menu" className='z-51' size={24} color="black" />
              </TouchableOpacity>

              <View className="flex-row items-center">
                <TouchableOpacity onPress={handlePreviousMonth}>
                  <FontAwesome6 name="chevron-left" size={18} color="black" />
                </TouchableOpacity>
                <Text className="font-semibold mx-2">{months[currentMonthIndex]}</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                  <FontAwesome6 name="chevron-right" size={18} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={()=>setShowNotification(true)}>
                <Ionicons name="notifications" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
              className="bg-violet py-2 px-4 rounded-3xl"
              activeOpacity={0.6}
              onPress={() => setIsPersonnalVisible(!isPersonnalVisible)}
            >
              <Text className='text-center text-white'>{isPersonnalVisible ? "go to Communities" : "go to Personnal"}</Text>
            </TouchableOpacity>
          </View>

          {isPersonnalVisible && <MyPersonnal />}

          {!isPersonnalVisible && <MyCommunities />}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Header = () => {
  return (
    <View className="flex-row justify-between items-center gap-8 mt-4 ">
      <View>
        <Ionicons name="menu" size={24} color="black" />
      </View>
      {/* this is for expenses and income for each month */}
      <View className='text-xl flex-row justify-center gap-1'>
        <Text className='font-psemibold'>Month</Text>
        <FontAwesome6 name="chevron-down" size={18} color="black" />
      </View>
      <View>
       <Ionicons name="notifications" size={24}/>
      </View>
    </View> 
  );
};

export default Header;

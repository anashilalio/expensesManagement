import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

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

  return (
    <View>
      <View className="flex-row justify-between items-center mt-4 px-4">
        <TouchableOpacity onPress={() => setShowMenu((prev) => !prev)}>
          <Ionicons name="menu" size={24} color="black" />
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

        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showMenu && (
        <View className="absolute top-0 left-0 h-full w-1/2 bg-violet z-50">
          <TouchableOpacity className="p-4 border-b border-gray-200">
            <Text className="text-white">Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-gray-200">
            <Text className="text-white">Community</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-gray-200">
            <Text className="text-white">Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-gray-200">
            <Text className="text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

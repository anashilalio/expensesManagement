import React from 'react';
import { View, Text } from 'react-native';
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center gap-8 mb-4">
      <View>
        <GiHamburgerMenu className="size-6" />
      </View>
      {/* this is for expenses and income for each month */}
      {/* <View className='text-xl flex-row items-center gap-1'>
        Month <FaChevronDown className='text-sm mt-2'/>
      </View>
      <View>
       <IoIosNotifications className="size-6"/>
      </View> */}
    </View>
  );
};

export default Header;

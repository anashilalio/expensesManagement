import { TouchableOpacity, Text, ImageSourcePropType, Image, View } from 'react-native'
import React from 'react'

interface CustomButtonProps{
    icon?: ImageSourcePropType,
    title: string;
    handlePress: () => void;
    containerStyles: string;
    textStyles: string;
    isLoading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({icon, title, handlePress, containerStyles, textStyles, isLoading}) => {

  return (
    <TouchableOpacity
        onPress={() => handlePress()}
        activeOpacity={0.6}
        className={`rounded-2xl min-h-[64px]
          ${containerStyles} ${isLoading ? 'opacity-50': ''}`}
        disabled={isLoading}
    >
      {icon && 
        <Image 
          source={icon}
          className='w-8 h-8'
        />
      }
      <Text className={`font-psemibold text-lg ${textStyles}`}>
          {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;
import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface CustomButtonProps{
    title: string;
    handlePress: () => void;
    containerStyles: string;
    textStyles: string;
    isLoading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.6}
        className={`rounded-2xl min-h-[64px] justify-center ${containerStyles}
                    ${isLoading ? 'opacity-50': ''}`}
        disabled={isLoading}
    >
        <Text className={`font-psemibold text-lg text-center ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;
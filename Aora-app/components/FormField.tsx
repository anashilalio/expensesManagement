import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Eye from "../assets/icons/eye.png"
import EyeHide from "../assets/icons/eye-hide.png"

interface FormFieldPropos{
    title: string,
    value: string,
    handleChangedText: (e: any) => void,
    styles?: string,
    keyboardType?: string,
    placeholder: string,
}
const FormField: React.FC<FormFieldPropos> = ({title, value, handleChangedText, styles, keyboardType,
    placeholder}) => {

    const [showPassword, setShowPassword] = useState(true)

    const [isFocused, setIsFocused] = useState(false)
    
    return (
        <View className={`space-y-2 ${styles}`}>
            
            <View className={`w-full h-20 px-4 border-2 rounded-2xl
                 flex-row items-center ${isFocused ? 'border-borderActive' : 'border-borderInactive'}`}>
                <TextInput
                    className='flex-1 text-text-dark font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#91919f"
                    onChangeText={handleChangedText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}>
                        <Image 
                            source={!showPassword ? EyeHide : Eye}
                            className="w-7 h-7"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField
import { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Eye from "../assets/icons/eye.png"
import EyeHide from "../assets/icons/eye-hide.png"

interface FormFieldPropos{
    title: string,
    value: string,
    handleChangedText: (e: any) => void,
    styles: string,
    keyboardType?: string,
    placeholder: string,
}
const FormField: React.FC<FormFieldPropos> = ({title, value, handleChangedText, styles, keyboardType,
    placeholder}) => {

    const [showPassword, setShowPassword] = useState(true)

    const [isFocused, setIsFocused] = useState(false)
    
    return (
        <View className={`space-y-2 ${styles}`}>
            <Text className='text-base text-gray-300 font-pmedium'>
                {title}
            </Text>
            
            <View className={`w-full h-16 px-4 border-2 rounded-xl
                 flex-row items-center ${isFocused ? 'border-borderActive' : 'border-borderInactive'}`}>
                <TextInput
                    className='flex-1 items-center text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
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
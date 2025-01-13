import { profileSettingsIcons } from "@/utils/IconMapping"
import { text } from "@/utils/text"
import React from "react"
import {Text , TouchableOpacity, View } from 'react-native'
interface SettingProps{
    title: string,
    details: string,
    icon: any
}

const Setting: React.FC<SettingProps> = ({title, details, icon}) => {

    const Icon = profileSettingsIcons[icon] || null

    return(
        <TouchableOpacity className="flex-row items-center gap-6 py-5 border-b-hairline border-gray-200" onPress={}>
            {Icon && <Icon size={28} color={text.title}/>}
            <View className="flex-col">
                <Text className="text-base text-title font-psemibold">{title}</Text>
                <Text className="text-sm text-subtitle font-plight">{details}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default Setting
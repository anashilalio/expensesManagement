import { CurrencyContext } from '@/app/(tabs)/home';
import { formatAmount } from '@/utils/format';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ExpoRootProps } from 'expo-router/build/ExpoRoot';
import React, { useContext } from 'react';
import { View, Text } from "react-native"

interface FinancialsProps{
    title: string,
    amount: string,
    bg: string,
    arrowIconName: any
}
const Financials : React.FC<FinancialsProps> =  ({title, amount, bg, arrowIconName}) => {
    return (
        <View className='rounded-3xl flex-1 flex-row justify-center p-4 gap-3 border-4 border-gray-50'>
            <View className="flex justify-center items-center rounded-lg">
                <FontAwesome name={arrowIconName} size={20} color={bg} />
                <FontAwesome6 name="wallet" size={24} color={bg} />
            </View>
            <View>
                <Text className='text-lg font-psemibold'>{title}</Text>
                <Text className='text-xl font-psemibold text-center' style={{color: bg}}>${amount}</Text>
            </View>
        </View>
    )
}
export default Financials
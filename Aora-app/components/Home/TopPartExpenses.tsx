import React, { useContext } from "react"
import { Text, View } from "react-native"
import { CurrencyContext } from "@/app/(tabs)/home"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { formatAmount } from "../../utils/format"
import { useAuth } from "../AuthContext"

const TopPartExpenses = () => {

    const { currency } = useContext(CurrencyContext)

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const { user, setUser } = useAuth();

    const currentDate = new Date()
    const firstDayOfMonth = new Date()
    firstDayOfMonth.setDate(1)

    const formatDate = (date: Date) => {
        let monthNum = date.getMonth()
        let monthStr = monthNames[monthNum].substring(0, 3)
        let day = date.getDate()
        let year = date.getFullYear()
        return `${day} ${monthStr} ${year}`
    }


    return (
        <View className="flex-row justify-between">

            <View>
                <Text className='font-psemibold text-lg text-title'>
                    Expenses
                </Text>
                <Text className='font-plight text-sm text-subtitle'>
                    {formatDate(firstDayOfMonth)} - {formatDate(currentDate)}
                </Text>
            </View>

            <Text className="font-psemibold text-xl text-tomato-primary">
                {formatAmount(user.totalExpenses, currency)}
            </Text>

        </View>
    )
}

export default TopPartExpenses
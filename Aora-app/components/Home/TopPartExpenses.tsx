import React, { useContext, useEffect, useMemo } from "react"
import { Text, View } from "react-native"
import { CurrencyContext } from "@/app/(tabs)/home"
import { formatAmount } from "../../utils/format"

const TopPartExpenses: React.FC<{ totalExpenses: number, currentMonthIndex: number }> = ({ totalExpenses, currentMonthIndex }) => {

    const { currency } = useContext(CurrencyContext)

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDateSelected = useMemo(() => {
        const currentDate = new Date()

        if (currentDate.getMonth() === currentMonthIndex)
            return currentDate

        return new Date(currentDate.getFullYear(), currentMonthIndex+1, 0);

    }, [currentMonthIndex])


    const currentDateFirstDay = useMemo(() => {
        return new Date(currentDateSelected.getFullYear(), currentMonthIndex, 1)
    }, [currentDateSelected])


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
                    {formatDate(currentDateFirstDay)} - {formatDate(currentDateSelected)}
                </Text>
            </View>

            <Text className="font-psemibold text-xl text-tomato-primary">
                {formatAmount(totalExpenses, currency)}
            </Text>

        </View>
    )
}

export default TopPartExpenses
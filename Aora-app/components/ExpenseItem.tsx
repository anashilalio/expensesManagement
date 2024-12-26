import { Text, View } from "react-native"
import React, { useContext } from "react"
import { CurrencyContext } from "@/app/(tabs)/home"
import { formatAmount } from "@/utils/format"

interface ExpenseItemProps {
    name?: string,
    category: string,
    amount: number
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ name, category, amount }) => {

    const {currency, totalExpenses} = useContext(CurrencyContext)

    const expenseName = name || category

    return (
        <View className='flex-row justify-between p-6 border-2 border-gray-50 rounded-3xl'>
            <View>
                <Text className="font-psemibold text-base text-title">
                    {expenseName}
                </Text>
                <Text className="font-plight text-sm text-subtitle">
                    {category}
                </Text>
            </View>
            <View>
                <Text className="font-psemibold text-lg text-tomato-primary">
                    {formatAmount(amount, currency)}
                </Text>
            </View>
        </View>
    )
}

export default ExpenseItem
import { Text, View } from "react-native"
import React, { useContext, useMemo } from "react"
import { CurrencyContext } from "@/app/(tabs)/home"
import { formatAmount, formatDate } from "@/utils/format"
import { categoryIcons } from "@/utils/IconMapping"
import DefaultIcon from "./category-icons/DefaultIcon"

interface ExpenseProps {
    description?: string,
    category: string,
    amount: number,
    date: string
}

const Expense: React.FC<ExpenseProps> = ({ description, category, amount, date }) => {

    const { currency } = useContext(CurrencyContext)

    const expenseDescription = description || category
    const iconSize = 30
    const IconComponent = categoryIcons[category] || null;

    return (
        <View className='flex-row items-center gap-3 px-6 py-5 border-4 border-gray-50 rounded-3xl'>
            {(   
                IconComponent
                ? <IconComponent size={iconSize} />
                : <DefaultIcon size={iconSize} name={category}/>
            )}
            <View className="flex-row flex-1 items-center justify-between gap-8">
                <View className="flex-col gap-1 flex-shrink">
                    <Text
                        className="font-psemibold text-base text-title"
                        numberOfLines={1}
                    >
                        {expenseDescription}
                    </Text>
                    <Text
                        className="font-plight text-sm text-subtitle"
                        numberOfLines={1}
                    >
                        {category}
                    </Text>
                </View>
                <View className="flex-col gap-1">
                    <Text className="font-psemibold text-lg text-tomato-primary text-right">
                        {formatAmount(amount, currency)}
                    </Text>
                    <Text className="font-plight text-sm text-subtitle text-right">
                        {formatDate(date)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Expense
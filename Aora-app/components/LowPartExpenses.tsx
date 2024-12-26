import { Text, View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import PieChartSegment from "./PieChartSegment";
import { useContext, useEffect } from "react";
import { PieChartContext } from "@/app/(tabs)/home";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { formatAmount } from "../utils/format"

const LowPartExpenses = () => {

    const { categoryData, currency, totalExpenses } = useContext(PieChartContext)

    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = 0
        progress.value = withTiming(1, {
            duration: 1000,
        })
    }, [])

    const width = 160
    const height = 160
    const cx = width / 2
    const cy = height / 2
    const r = 55
    const strokeWidth = 18
    const circumeference = 2 * Math.PI * r

    return (
        <View className="flex-row items-center gap-12">

            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {categoryData.map((category, index) => {

                    const percentage = category.amount / totalExpenses;
                    const angle = categoryData
                        .slice(0, index)
                        .reduce((sum, item) => sum + item.amount, 0) / totalExpenses * 360;

                    return (
                        <PieChartSegment
                            key={category.index}
                            cx={cx}
                            cy={cy}
                            r={r}
                            strokeWidth={strokeWidth}
                            stroke={category.color}
                            circumeference={circumeference}
                            percentage={percentage}
                            originX={cx}
                            originY={cy}
                            angle={angle}
                            progress={progress}
                        />
                    );
                })}
            </Svg>

            <View className="gap-5">
                {categoryData.map((category, index) => {
                    return (
                        <View className="" key={index}>
                            <View className="flex-row gap-2 items-center">
                                <View className='w-3 h-6 rounded-md' style={{ backgroundColor: category.color }}></View>
                                <Text className="text-black font-psemibold text-base">
                                    {category.category}
                                </Text>
                            </View>
                            <Text className="pl-5 text-gray-500 font-pmedium text-sm">
                                {formatAmount(category.amount, currency)}
                            </Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default LowPartExpenses
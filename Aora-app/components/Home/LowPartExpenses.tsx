import { Text, View } from "react-native";
import Svg from "react-native-svg";
import PieChartSegment from "../PieChartSegment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CurrencyContext } from "@/app/(tabs)/home";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { formatAmount } from "../../utils/format"
import { categoriesColors } from "@/utils/categoriesColors";
import { useAuth } from "../AuthContext";

const LowPartExpenses = () => {

    const { currency } = useContext(CurrencyContext)

    const { user, setUser } = useAuth()

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

    /*
        turns user.CategoriesDetails of userdata  : {"name": "Transport", "total": 100}
        to {"angle": 0, "name": "Transport", "percentage": 0.35587188612099646, "total": 100}
        angle and percentage are used to draw pieChart
    */
    const categoriesDetails = useMemo(() => {
        let angleStart = 0
        const categoriesDetails = user.CategoriesTotal.map((category: any, index: number) => {
            const percentage = category.total / user.totalExpenses;
            let angle = angleStart
            const segment = { ...category, angle, percentage }
            angleStart = angleStart + percentage * 360;
            return segment
        })
        console.log(categoriesDetails);

        return categoriesDetails
    },
        [user.CategoriesTotal, user.totalExpenses]
    );

    return (
        <View className="flex-row items-center gap-8">

            <Svg className="flex-1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {
                    categoriesDetails.map((category: any, index: number) => {
                        return (
                            <PieChartSegment
                                key={index}
                                cx={cx}
                                cy={cy}
                                r={r}
                                strokeWidth={strokeWidth}
                                stroke={categoriesColors[category.name]}
                                circumeference={circumeference}
                                percentage={category.percentage}
                                originX={cx}
                                originY={cy}
                                angle={category.angle}
                                progress={progress}
                            />
                        );
                    })}
            </Svg>

            <View className="flex-1 gap-5">
                {user.CategoriesTotal.map((category: any, index: number) => {
                    return (
                        <View className="" key={index}>
                            <View className="flex-row gap-2 items-center">
                                <View className='w-3 h-6 rounded-md' style={{ backgroundColor: categoriesColors[category.name] }}></View>
                                <Text className="text-black font-psemibold text-base">
                                    {category.name}
                                </Text>
                            </View>
                            <Text className="pl-5 text-gray-500 font-pmedium text-sm">
                                {formatAmount(category.total, currency)}
                            </Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default LowPartExpenses
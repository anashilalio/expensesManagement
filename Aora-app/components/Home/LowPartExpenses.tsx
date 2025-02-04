import { LayoutChangeEvent, ScrollView, Text, View } from "react-native";
import Svg from "react-native-svg";
import PieChartSegment from "../PieChartSegment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CurrencyContext } from "@/app/(tabs)/home";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { formatAmount } from "../../utils/format"
import { useAuth } from "../AuthContext";

interface LowPartExpensesProps {
    categories: any
    totalExpenses: number
}
const LowPartExpenses: React.FC<LowPartExpensesProps> = ({ categories, totalExpenses }) => {

    const { currency } = useContext(CurrencyContext)

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
        console.log("lowerpart");
        
        console.log(categories);
        
        let angleStart = 0
        const categoriesDetails = categories.map((category: any, index: number) => {
            const percentage = category.total / totalExpenses;
            let angle = angleStart
            const segment = { ...category, angle, percentage }
            angleStart = angleStart + percentage * 360;
            return segment
        })
        return categoriesDetails
    },
        [categories, totalExpenses]
    );

    const categoriesFlexGap = 20

    const [viewHeights, setViewHeights] = useState<number[]>([]);

    const onLayout = (event: any, index: number) => {
        const { height } = event.nativeEvent.layout;
        if (index < 4) {
            setViewHeights((prevHeights) => {
                const newHeights = [...prevHeights];
                newHeights[index] = height;
                return newHeights.slice(0, 4);
            });
        }
    };

    const maxHeight = viewHeights.reduce((sum, height) => sum + height + categoriesFlexGap, 0) - categoriesFlexGap;

    return (
        <View className="flex-row items-center gap-8">

            <Svg className="flex-1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {
                    totalExpenses > 0
                        ?
                        categoriesDetails.map((category: any, index: number) => {
                            return (
                                <PieChartSegment
                                    key={index}
                                    cx={cx}
                                    cy={cy}
                                    r={r}
                                    strokeWidth={strokeWidth}
                                    stroke={category.color}
                                    circumeference={circumeference}
                                    percentage={category.percentage}
                                    originX={cx}
                                    originY={cy}
                                    angle={category.angle}
                                    progress={progress}
                                />
                            );
                        })
                        :
                        <PieChartSegment
                            key={0}
                            cx={cx}
                            cy={cy}
                            r={r}
                            strokeWidth={strokeWidth}
                            stroke="#CCCCCC"
                            circumeference={circumeference}
                            percentage={1}
                            originX={cx}
                            originY={cy}
                            angle={0}
                            progress={progress}
                        />
                }
            </Svg>

            <ScrollView
                style={{ maxHeight }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1" style={{ gap: categoriesFlexGap }}>
                    {categories.map((category: any, index: number) => {
                        return (
                            <View className="" key={index} onLayout={(event) => onLayout(event, index)}>
                                <View className="flex-row gap-2 items-center">
                                    <View className='w-3 h-6 rounded-md' style={{ backgroundColor: category.color }}></View>
                                    <Text
                                        className="text-black font-psemibold text-base flex-shrink"
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
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
            </ScrollView>
        </View>
    )
}

export default LowPartExpenses
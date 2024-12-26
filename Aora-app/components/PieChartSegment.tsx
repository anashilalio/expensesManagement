import React from "react"
import Animated, { interpolate, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { Circle } from "react-native-svg";

interface PieChartSegmentProps {
    cx: number;
    cy: number;
    r: number;
    strokeWidth: number;
    circumeference: number;
    percentage: number;
    stroke: string;
    angle: number;
    originX: number;
    originY: number;
    progress: any;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const PieChartSegment: React.FC<PieChartSegmentProps> = ({ cx, cy, r, strokeWidth,
    circumeference, angle, percentage, stroke, progress }) => {

    const strokeWidthAnimated = useSharedValue(strokeWidth)

    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = interpolate(
            progress.value,
            [0, 1],
            [circumeference, circumeference * (1 - percentage)]
        )
        return {
            strokeDashoffset: strokeDashoffset,
            strokeWidth: strokeWidthAnimated.value
        }
    })

    const categoryDetails = () => {
        strokeWidthAnimated.value = withTiming(
            (strokeWidthAnimated.value == strokeWidth ? strokeWidth * 1.5 : strokeWidth),
            {
                duration: 300
            }
        )
    }

    return (
        <AnimatedCircle
            cx={cx}
            cy={cy}
            r={r}
            stroke={stroke}
            strokeDasharray={circumeference}
            fill="none"
            originX={cx}
            originY={cy}
            rotation={angle}
            animatedProps={animatedProps}
            onPress={categoryDetails}
        />
    )

}

export default PieChartSegment
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../AuthContext';
import React, { useMemo } from 'react';
import tinycolor from "tinycolor2"

interface FoodIconProps {
    size: number
}
const FoodIcon: React.FC<FoodIconProps> = ({ size }) => {

    const { user } = useAuth()

    const color = useMemo(() => {
        const category = user.categories.find((category: any) => category.name === "Food");
        return category.color
    }, [user.categories]);

    const backgroundColor = useMemo(() => {
        return tinycolor(color).lighten(45).toString();
    }, [color]);

    return (
        <MaterialCommunityIcons
            name="food-fork-drink"
            size={size}
            color={color}
            className="p-4 rounded-3xl"
            style={{
                backgroundColor
            }}
        />
    )
}

export default FoodIcon
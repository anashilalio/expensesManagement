import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../AuthContext';
import React from 'react';

interface FoodIconProps{
    size: number
}
const FoodIcon : React.FC<FoodIconProps> = ({size}) => {

    const { user } = useAuth()

    const color = user.categories.find((category: any) => category.name === "Food").color

    return(
        <MaterialCommunityIcons 
            name="food-fork-drink"
            size={size}
            color={color}
            className="bg-category-food-secondary p-4 rounded-3xl"
        />
    )
}

export default FoodIcon
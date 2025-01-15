import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { useAuth } from '../AuthContext';

interface ShoppingIconProps{
    size: number
}
const ShoppingIcon : React.FC<ShoppingIconProps> = ({size}) => {

    const { user } = useAuth()

    const color = user.categories.find((category: any) => category.name === "Shopping").color

    return(
        <FontAwesome
            name="shopping-basket"
            size={size}
            color={color}
            className="bg-category-shopping-secondary p-4 rounded-3xl"
        />
    )
}

export default ShoppingIcon
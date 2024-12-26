import { categoriesColors } from '@/utils/categoriesColors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';

interface ShoppingIconProps{
    size: number
}
const ShoppingIcon : React.FC<ShoppingIconProps> = ({size}) => {
    return(
        <FontAwesome
            name="shopping-basket"
            size={size}
            color={categoriesColors.Shopping}
            className="bg-category-shopping-secondary p-4 rounded-3xl"
        />
    )
}

export default ShoppingIcon
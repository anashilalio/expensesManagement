import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useMemo } from 'react';
import { useAuth } from '../AuthContext';
import tinycolor from "tinycolor2"

interface ShoppingIconProps{
    size: number
}
const ShoppingIcon : React.FC<ShoppingIconProps> = ({size}) => {

    const { user } = useAuth()

    const color = useMemo(() => {
        const category = user.categories.find((category: any) => category.name === "Shopping");
        return category.color
    }, [user.categories]);

    const backgroundColor = useMemo(() => { 
        return tinycolor(color).lighten(29).toString();
    }, [color]);

    return(
        <FontAwesome
            name="shopping-basket"
            size={size}
            color={color}
            className="p-4 rounded-3xl"
            style={{
                backgroundColor
            }}
        />
    )
}

export default ShoppingIcon
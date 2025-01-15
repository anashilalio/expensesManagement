import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { useAuth } from '../AuthContext';

interface TransportIconProps{
    size: number
}
const TransportIcon : React.FC<TransportIconProps> = ({size}) => {

    const { user } = useAuth()

    const color = user.categories.find((category: any) => category.name === "Transport").color

    return(
        <FontAwesome6
            name="car-side"
            size={size}
            color={color}
            className="bg-category-transport-secondary p-4 rounded-3xl"
        />
    )
}

export default TransportIcon
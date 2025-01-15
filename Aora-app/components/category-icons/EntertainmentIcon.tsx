import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { useAuth } from '../AuthContext';

interface EntertainmentIconProps {
    size: number
}
const EntertainmentIcon: React.FC<EntertainmentIconProps> = ({ size }) => {

    const { user } = useAuth()

    const color = user.categories.find((category: any) => category.name === "Entertainment").color

    return (
        <MaterialCommunityIcons
            name="youtube-tv"
            size={size}
            color={color}
            className="bg-category-entertainment-secondary p-4 rounded-3xl"
        />
    )
}

export default EntertainmentIcon
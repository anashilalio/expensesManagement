import React from 'react';
import { useAuth } from '../AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DefaultIconProps {
    size: number
    name: string
}
const DefaultIcon: React.FC<DefaultIconProps> = ({ size, name }) => {

    const { user } = useAuth()

    const color = user.categories.find((category: any) => category.name === name).color

    return (
        <MaterialIcons
            name="category"
            size={size}
            color={color}
            className="bg-category-entertainment-secondary p-4 rounded-3xl"
        />
    )
}

export default DefaultIcon
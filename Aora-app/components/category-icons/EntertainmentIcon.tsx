import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useMemo } from 'react';
import { useAuth } from '../AuthContext';
import tinycolor from 'tinycolor2'

interface EntertainmentIconProps {
    size: number
}
const EntertainmentIcon: React.FC<EntertainmentIconProps> = ({ size }) => {

    const { user } = useAuth()

    const color = useMemo(() => {
        const category = user.categories.find((category: any) => category.name === "Entertainment");
        return category.color
    }, [user.categories]);

    const backgroundColor = useMemo(() => {
        return tinycolor(color).lighten(50).toString();
    }, [color]);
    
    return (
        <MaterialCommunityIcons
            name="youtube-tv"
            size={size}
            color={color}
            className="p-4 rounded-3xl"
            style={{
                backgroundColor
            }}
        />
    )
}

export default EntertainmentIcon
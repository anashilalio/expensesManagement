import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useMemo } from 'react';
import { useAuth } from '../AuthContext';
import tinycolor from 'tinycolor2'

interface TransportIconProps {
    size: number
}
const TransportIcon: React.FC<TransportIconProps> = ({ size }) => {

    const { user } = useAuth()

    const color = useMemo(() => {
        const category = user.categories.find((category: any) => category.name === "Transport");
        return category.color
    }, [user.categories]);

    const backgroundColor = useMemo(() => {
        return tinycolor(color).lighten(50).toString();
    }, [color]);

    return (
        <FontAwesome6
            name="car-side"
            size={size}
            color={color}
            className="p-4 rounded-3xl"
            style={{
                backgroundColor
            }}
        />
    )
}

export default TransportIcon
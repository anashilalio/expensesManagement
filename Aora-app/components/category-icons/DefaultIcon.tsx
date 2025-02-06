import React, { useMemo } from 'react';
import { useAuth } from '../AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tinycolor from 'tinycolor2'

interface DefaultIconProps {
    size: number
    name?: string
    color: string
}
const DefaultIcon: React.FC<DefaultIconProps> = ({ size, name, color }) => {

    const { user } = useAuth()

    const backgroundColor = useMemo(() => { 
        return tinycolor(color).lighten(30).toString();
    }, [color]);

    return (
        <MaterialIcons
            name="category"
            size={size}
            color={color}
            className="p-4 rounded-3xl"
            style={{
                backgroundColor
            }}
        />
    )
}

export default DefaultIcon
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

interface CurrencyIconProps{
    size: number,
    color: string
}
const CurrencyIcon: React.FC<CurrencyIconProps> = ({size, color}) => {
    return(
        <MaterialIcons name="currency-exchange" size={size} color={color}/>
    )
}
export default CurrencyIcon
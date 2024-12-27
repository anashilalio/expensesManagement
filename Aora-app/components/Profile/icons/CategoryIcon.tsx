import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

interface CategoryIconProps{
    size: number,
    color: string
}
const CategoryIcon: React.FC<CategoryIconProps> = ({size, color}) => {
    return(
        <MaterialIcons name="category" size={size} color={color}/>
    )
}
export default CategoryIcon
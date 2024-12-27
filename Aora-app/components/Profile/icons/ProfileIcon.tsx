import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';

interface ProfileIconProps{
    size: number,
    color: string
}
const ProfileIcon: React.FC<ProfileIconProps> = ({size, color}) => {
    return(
        <FontAwesome name="user-circle" size={size} color={color}/>
    )
}
export default ProfileIcon
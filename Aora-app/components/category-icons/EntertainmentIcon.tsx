import { categoriesColors } from '@/utils/categoriesColors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface EntertainmentIconProps{
    size: number
}
const EntertainmentIcon : React.FC<EntertainmentIconProps> = ({size}) => {
    return(
        <MaterialCommunityIcons 
            name="youtube-tv"
            size={size}
            color={categoriesColors.Entertainment}
            className="bg-category-entertainment-secondary p-4 rounded-3xl"
        />
    )
}

export default EntertainmentIcon
import { categoriesColors } from '@/utils/categoriesColors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface TransportIconProps{
    size: number
}
const TransportIcon : React.FC<TransportIconProps> = ({size}) => {
    return(
        <FontAwesome6
            name="car-side"
            size={size}
            color={categoriesColors.Transport}
            className="bg-category-transport-secondary p-4 rounded-3xl"
        />
    )
}

export default TransportIcon
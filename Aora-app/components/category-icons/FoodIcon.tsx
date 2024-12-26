import { categoriesColors } from '@/utils/categoriesColors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface FoodIconProps{
    size: number
}
const FoodIcon : React.FC<FoodIconProps> = ({size}) => {
    return(
        <MaterialCommunityIcons 
            name="food-fork-drink"
            size={size}
            color={categoriesColors.Food}
            className="bg-category-food-secondary p-4 rounded-3xl"
        />
    )
}

export default FoodIcon
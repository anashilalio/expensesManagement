import EntertainmentIcon from "@/components/category-icons/EntertainmentIcon"
import FoodIcon from "../components/category-icons/FoodIcon"
import ShoppingIcon from "../components/category-icons/ShoppingIcon"
import TransportIcon from "../components/category-icons/TransportIcon"
import ProfileIcon from "@/components/Profile/icons/ProfileIcon"
import CurrencyIcon from "@/components/Profile/icons/CurrencyIcon"
import CategoryIcon from "@/components/Profile/icons/CategoryIcon"
import ExportIcon from "@/components/Profile/icons/ExportIcon"
import DefaultIcon from "@/components/category-icons/DefaultIcon"

type IconMapping = {
    [key: string] : React.FC<any>
}

export const categoryIcons: IconMapping = {
    Shopping: ShoppingIcon,
    Food: FoodIcon,
    Transport: TransportIcon,
    Entertainment: EntertainmentIcon,
    default: DefaultIcon
}

export const profileSettingsIcons: IconMapping = {
    Profile: ProfileIcon,
    Currency: CurrencyIcon,
    Category: CategoryIcon,
    Export: ExportIcon
}
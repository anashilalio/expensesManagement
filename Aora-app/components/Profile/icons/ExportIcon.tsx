import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ExportIconProps{
    size: number,
    color: string
}
const ExportIcon: React.FC<ExportIconProps> = ({size, color}) => {
    return(
        <MaterialCommunityIcons name="export-variant" size={size} color={color}/>
    )
}
export default ExportIcon
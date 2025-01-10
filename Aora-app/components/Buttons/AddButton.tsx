import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Rect } from 'react-native-svg'

const AddButton = () => {

    const width = 60
    const height = width
    const cx = width/2
    const cy = height/2
    const rSmall = width * 0.45
    const rLarge = width / 2
    const plusBarLenght = width * 0.4
    const plusXVertical = width/2
    const plusXHorizantal = width * 0.3
    const plusYVertical = height * 0.3
    const plusYHorizantal = height/2
    
    return(
        <View 
            style={{
                width: width,
                height: height,
                marginBottom: 20   
            }}
        >
            <Svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
                <Circle cx={cx} cy={cy} r={rLarge} fill="#D8B4FE"/>
                <Circle cx={cx} cy={cy} r={rSmall} fill="#7C3AED"/>
                <Rect x={plusXHorizantal} y={plusYHorizantal} width={plusBarLenght} height="1.5" rx="1" fill="white"/>
                <Rect x={plusXVertical} y={plusYVertical} width="1.5" height={plusBarLenght} rx="1" fill="white"/>
            </Svg>
        </View>
    )
}

export default AddButton
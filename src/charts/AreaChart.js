
import React from "react";
import {
    StyleSheet,
    Animated,
    View
} from 'react-native';
import styled from "styled-components";
import * as shape from 'd3-shape'
import { ClipPath, Defs, LinearGradient, Stop, Rect} from 'react-native-svg'
import { AreaChart } from 'react-native-svg-charts'
import DefaultHandler from "../components/DefaultHandler";


// const defaultProps = {
//     chartProps: {
//         contentInset: {top: 10, bottom: 0 },
//         curve: shape.curveNatural,
//     },
// };

const AnimatedAreaChart = Animated.createAnimatedComponent(AreaChart)
class DefaultAreaChart extends React.PureComponent {
    render() {
        const {
            data,
            chartProps,
            theme,
            style
        } = this.props

        const Gradient = ({ index }) => (
            <Defs key={'gradient-defs'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={theme.themeColor} stopOpacity={0.5}/>
                    <Stop offset={'100%'} stopColor={theme.themeColor} stopOpacity={1}/>
                </LinearGradient>
            </Defs>
        )



        const {
            handlePos, width
        } = this.props;
        const pos = handlePos[1].interpolate({
            inputRange: [0, 100],
            outputRange: [0, width],
            // extrapolate: 'clamp',
        }, {useNativeDriver: true});

        const prevValue = handlePos[0].interpolate({
            inputRange: [0, 100],
            outputRange: [0, -width],
            // extrapolate: 'clamp',
        }, {useNativeDriver: true});
        const prevPos = handlePos[0].interpolate({
            inputRange: [0, 100],
            outputRange: [0, width],
            // extrapolate: 'clamp',
        }, {useNativeDriver: true});
        const diffValue = Animated.add(pos, prevValue);

        return (
           <View style={[style]}>

            <AreaChart
                style={{ height: '100%'}}
                data={data}
                svg={{ fill: theme.grey,
                }}
                {...chartProps}
            />
           <Animated.View style={{ ...StyleSheet.absoluteFillObject, width: diffValue, height: '100%',transform: [{translateX: prevPos}], overflow: 'hidden'}}>
               <AnimatedAreaChart
                   style={{ transform: [{translateX: prevValue}], height: '100%', width: width,}}
                   data={data}
                   svg={{
                       fill: 'url(#gradient)',
                   }}
                   {...chartProps}
               >
                   <Gradient/>
               </AnimatedAreaChart>
           </Animated.View>
           </View>
        )
    }
}

// DefaultAreaChart.defaultProps = defaultProps;

const DefaultStyledAreaChart = styled(DefaultAreaChart).attrs({
    theme:  props => props.theme
})`
   height: 100px;
`
DefaultStyledAreaChart.defaultProps = {
    theme: {
        themeColor: 'palevioletred',
        grey: '#d8d8d8'
    },
    chartProps: {
        contentInset: {top: 10, bottom: 0 },
        curve: shape.curveNatural,
    },
}
export default DefaultStyledAreaChart

/*
*   Crash when using with Animated
*  const Clips = ({x, width}) => {
              const {
                    handlePos
            } = this.props;
            const pos = handlePos[1].interpolate({
                inputRange: [0, 100],
                outputRange: [0, width],
                // extrapolate: 'clamp',
            }, {useNativeDriver: true});

            const prevValue = handlePos[0].interpolate({
                inputRange: [0, 100],
                outputRange: [0, -width],
                // extrapolate: 'clamp',
            }, {useNativeDriver: true});
            const prevPos = handlePos[0].interpolate({
                inputRange: [0, 100],
                outputRange: [0, width],
                // extrapolate: 'clamp',
            }, {useNativeDriver: true});
            const diffValue = Animated.add(pos, prevValue);

            return (
                <Defs key={'clips'}>
                    <ClipPath id="clip-path" key={'1'}>
                        <AnimatedRect x={prevPos} y={'0'} width={diffValue} height={'100%'}/>
                    </ClipPath>
                </Defs>
            )
        }
 */
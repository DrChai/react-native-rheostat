import React from "react";
import {
    StyleSheet,
    Animated,
    View
} from 'react-native';
import styled from "styled-components";
import { Defs, LinearGradient, Stop} from 'react-native-svg'
import BarChart from "react-native-svg-charts/src/bar-chart/bar-chart";

// const defaultProps = {
//     chartProps: {
//         contentInset: {top: 10, bottom: 0,},
//     },
// };
const AnimatedBarChart = Animated.createAnimatedComponent(BarChart)


class DefaultBarChart extends React.PureComponent {
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
                <BarChart
                    style={{height: '100%'}}
                    data={data}
                    svg={{
                        fill: theme.grey,
                        strokeWidth: 0
                    }}
                    {...chartProps}
                />
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, width: diffValue, height: '100%',transform: [{translateX: prevPos}], overflow: 'hidden'}}>
                    <AnimatedBarChart
                        style={{ transform: [{translateX: prevValue}], height: '100%', width: width,}}
                        data={data}
                        svg={{
                            fill: theme.themeColor,
                        }}
                        {...chartProps}
                    >
                        <Gradient/>
                    </AnimatedBarChart>
                </Animated.View>
            </View>
        )
    }
}

DefaultBarChart.defaultProps = defaultProps;

const DefaultStyledBarChart = styled(DefaultBarChart).attrs({
    theme:  props => props.theme
})`
   height: 100px;
`
DefaultStyledBarChart.defaultProps = {
    chartProps: {
       contentInset: {top: 10, bottom: 0,},
    },
    theme: {
        themeColor: 'palevioletred',
        grey: '#d8d8d8'
    }
}
export default DefaultStyledBarChart
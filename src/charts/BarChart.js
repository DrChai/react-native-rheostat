import React from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import BarChart from 'react-native-svg-charts/src/bar-chart/bar-chart';

// const defaultProps = {
//     chartProps: {
//         contentInset: {top: 10, bottom: 0,},
//     },
// };
const AnimatedBarChart = Animated.createAnimatedComponent(BarChart);


class DefaultBarChart extends React.PureComponent {
  render() {
    const {
      data,
      chartProps,
      chartColor,
      backgroundColor,
      style,
      children,
    } = this.props;

    const {
      handlePos, width,
    } = this.props;
    const pos = handlePos[1].interpolate({
      inputRange: [0, 100],
      outputRange: [0, width],
      // extrapolate: 'clamp',
    }, { useNativeDriver: true });

    const prevValue = handlePos[0].interpolate({
      inputRange: [0, 100],
      outputRange: [0, -width],
      // extrapolate: 'clamp',
    }, { useNativeDriver: true });
    const prevPos = handlePos[0].interpolate({
      inputRange: [0, 100],
      outputRange: [0, width],
      // extrapolate: 'clamp',
    }, { useNativeDriver: true });
    const diffValue = Animated.add(pos, prevValue);

    return (
      <View style={[style]}>
        <BarChart
          style={{ height: '100%' }}
          data={data}
          svg={{
            fill: backgroundColor,
            strokeWidth: 0,
          }}
          {...chartProps}
        />
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          width: diffValue,
          height: '100%',
          transform: [{ translateX: prevPos }],
          overflow: 'hidden',
        }}
        >
          <AnimatedBarChart
            style={{ transform: [{ translateX: prevValue }], height: '100%', width }}
            data={data}
            svg={{
              fill: chartColor,
            }}
            {...chartProps}
          >
            {children}
          </AnimatedBarChart>
        </Animated.View>
      </View>
    );
  }
}

const DefaultStyledBarChart = styled(DefaultBarChart).attrs(props => ({
  chartColor: (props.theme.rheostat && props.theme.rheostat.themeColor) || 'palevioletred',
  backgroundColor: (props.theme.rheostat && props.theme.rheostat.grey) || '#d8d8d8',
}))`
   height: 100px;
`;
DefaultStyledBarChart.defaultProps = {
  chartProps: {
    contentInset: { top: 10, bottom: 0 },
  },
  children: null,
};
export default DefaultStyledBarChart;

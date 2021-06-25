import React, { ComponentClass } from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { AreaChart, ChartProps } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { AreaChartProps } from './types';
import styled from '../components/styled-components';

const AnimatedAreaChart = Animated.createAnimatedComponent(
  AreaChart as ComponentClass<ChartProps<number>>,
);

const DefaultAreaChart = (props:AreaChartProps) => {
  const {
    width, style, data, backgroundColor, chartColor, children, handlePos,
    curve = shape.curveNatural,
    contentInset = { top: 10, bottom: 0 },
    ...chartProps
  } = props;
  const pos = handlePos[1].interpolate({
    inputRange: [0, 100],
    outputRange: [0, width],
    // extrapolate: 'clamp',
  });

  const prevValue = handlePos[0].interpolate({
    inputRange: [0, 100],
    outputRange: [0, -width],
    // extrapolate: 'clamp',
  });
  const prevPos = handlePos[0].interpolate({
    inputRange: [0, 100],
    outputRange: [0, width],
    // extrapolate: 'clamp',
  });
  const diffValue = Animated.add(pos, prevValue);
  // @ts-ignore
  return (
    <View style={[style]}>
      <AreaChart
        style={{ height: '100%' }}
        data={data}
        curve={curve}
        contentInset={contentInset}
        svg={{ fill: backgroundColor }}
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
        <AnimatedAreaChart
          style={{ transform: [{ translateX: prevValue }], height: '100%', width }}
          data={data}
          svg={{
            fill: chartColor,
          }}
          curve={curve}
          contentInset={contentInset}
          {...chartProps}
        >
          {children}
        </AnimatedAreaChart>
      </Animated.View>
    </View>
  );
};

const DefaultStyledAreaChart = styled(DefaultAreaChart).attrs((props) => ({
  chartColor: props.chartColor || (props.theme.rheostat?.themeColor) || 'palevioletred',
  backgroundColor: props.backgroundColor || (props.theme.rheostat?.grey) || '#d8d8d8',
}))`
   height: 100px;
`;

export default DefaultStyledAreaChart;

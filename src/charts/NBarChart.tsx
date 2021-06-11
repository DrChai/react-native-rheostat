import React, {ComponentClass} from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { BarChart, ChartProps } from 'react-native-svg-charts';

import { AreaChartProps } from './types';

const AnimatedBarChart = Animated.createAnimatedComponent(
  BarChart as ComponentClass<ChartProps<number>>,
);

const DefaultBarChart = (props:AreaChartProps) => {
  const {
    width, style, data, backgroundColor, chartColor, children, handlePos,
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
      <BarChart
        style={{ height: '100%' }}
        data={data}
        contentInset={contentInset}
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
          contentInset={contentInset}
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
};

export default DefaultBarChart;

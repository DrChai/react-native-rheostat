import React, { ComponentClass } from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { ChartProps, BarChart } from 'react-native-svg-charts';
import { AreaChartProps } from './types';
import styled from '../components/styled-components';

// NO-QA here, BarChart is FC not accepted by Animated, then wrapped by Memo.
// memo types is not friendly.
const PureBarChart = React.memo(BarChart);
const AnimatedBarChart = Animated.createAnimatedComponent(
  PureBarChart as unknown as ComponentClass<ChartProps<number>>,
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
          svg={{
            fill: chartColor,
          }}
          contentInset={contentInset}
          {...chartProps}
        >
          {children}
        </AnimatedBarChart>
      </Animated.View>
    </View>
  );
};

const DefaultStyledBarChart = styled(DefaultBarChart).attrs((props) => ({
  chartColor: props.chartColor || (props.theme.rheostat?.themeColor) || 'palevioletred',
  backgroundColor: props.backgroundColor || (props.theme.rheostat?.grey) || '#d8d8d8',
}))`
   height: 100px;
`;
export default DefaultStyledBarChart;
import type React from 'react';
import { ChartProps } from 'react-native-svg-charts';
import { Animated } from 'react-native';

type BaseChartProps = Omit<ChartProps<number>, 'svg'>;

export type AreaChartProps = BaseChartProps & {
  width: number;
  backgroundColor?: string;
  chartColor?: string;
  children: React.ReactNode;
  handlePos: [Animated.Value, Animated.Value]
};

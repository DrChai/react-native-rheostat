/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Moment from 'moment';
import Rheostat, {
  AreaRheostat,
  BarRheostat,
  RheostatThemeProvider,
} from 'react-native-rheostat';
type HandlersState = {
  min: number;
  max: number;
  values: number[];
};
const areaSvgData = [
  50, 10, 40, 85, 85, 91, 35, 53, 24, 50, 10, 40, 95, 85, 40, 24,
];
const defaultProps = {
  snapPoints: [
    0, 60, 120, 180, 240, 300, 330, 360, 420, 480, 540, 570, 600, 630, 660, 690,
    720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110,
    1140, 1170, 1200, 1260, 1320, 1380, 1440,
  ],
  values: [480, 1040],
  svgData: [
    50, 50, 10, 10, 40, 40, 95, 95, 85, 85, 91, 35, 53, 53, 24, 50, 50, 10, 40,
    95, 85, 91, 35, 53, 24, 50, 50, 10, 40, 95, 85, 91, 35, 53, 50, 50, 50, 10,
    40, 95, 91, 91, 24, 24, 50, 50, 10, 10,
  ],
};

const theme = {
  themeColor: '#ffbd45',
  grey: '#dedbdb',
};

const App = () => {
  const {values, svgData, snapPoints} = defaultProps;
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState<HandlersState>({
    values: [10, 80],
    min: 0,
    max: 100,
  });
  const onRheostatValUpdated = (payload: HandlersState) => {
    setTimeRange(payload);
  };

  const onSliderDragStart = () => {
    setScrollEnabled(false);
  };

  const onSliderDragEnd = () => {
    setScrollEnabled(true);
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: 15,
        }}
        scrollEnabled={scrollEnabled}>
        <Text style={{fontWeight: '800'}}>Example</Text>
        <View style={{flex: 1, paddingTop: 20, paddingBottom: 80}}>
          <Text style={{marginTop: 15}}>
            {Moment.utc()
              .startOf('day')
              .add(timeRange.values[0], 'minutes')
              .format('hh:mm A')}
            -
            {Moment.utc()
              .startOf('day')
              .add(timeRange.values[1], 'minutes')
              .format('hh:mm A')}
          </Text>
          <Rheostat
            values={values}
            min={0}
            max={1440}
            snapPoints={snapPoints}
            snap
            onValuesUpdated={onRheostatValUpdated}
            onSliderDragStart={onSliderDragStart}
            onSliderDragEnd={onSliderDragEnd}
          />
          <BarRheostat
            values={values}
            min={0}
            max={1440}
            snap
            snapPoints={snapPoints}
            svgData={svgData}
            onValuesUpdated={onRheostatValUpdated}
          />
          <AreaRheostat
            values={values}
            min={0}
            max={1440}
            svgData={areaSvgData}
          />
        </View>
        <View>
          <Text style={{fontWeight: '800'}}>Example with styled-component</Text>
          <AreaRheostat
            values={values}
            min={0}
            max={1440}
            theme={{rheostat: {themeColor: 'black', grey: '#dedbdb'}}}
            svgData={areaSvgData}
          />
          <RheostatThemeProvider theme={theme}>
            <View>
              <BarRheostat
                values={values}
                min={0}
                max={1440}
                svgData={areaSvgData}
              />
              <AreaRheostat
                values={values}
                min={0}
                max={1440}
                theme={{rheostat: {themeColor: '#8bc34a', grey: '#dedbdb'}}}
                svgData={areaSvgData}
              />
            </View>
          </RheostatThemeProvider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Moment from 'moment';
import {name as appName} from './app.json';
import {ThemeProvider} from 'styled-components'
import Rheostat, {AreaRheostat, BarRheostat} from "react-native-rheostat";

const areaSvgData = [ 50, 10, 40, 85, 85, 91, 35,  53, 24,
    50, 10, 40, 95, 85, 40,
    24, ]
const singleValues = [330];
const defaultProps = {
    snapPoints: [0,60,120,180,240,300,330,360,420,480,540,570,600,630,660,690,
        720,750,780,810,840,870,900,930,960,990,1020,1050,1080,1110,1140,1170,1200,
        1260,1320,1380,
        1440],
    values: [
        480, 1040
    ],
    svgData: [ 50, 50, 10, 10, 40, 40, 95,95, 85, 85, 91, 35, 53, 53, 24, 50,
        50, 10, 40, 95, 85, 91, 35, 53,  24, 50,
        50, 10, 40, 95, 85, 91, 35, 53,  50, 50,
        50, 10, 40, 95, 91, 91, 24, 24,  50, 50,
        10, 10,  ]
};

const theme = {
    themeColor: '#ffbd45',
    grey: '#fafafa'
}

export default class RheostatExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollEnabled: true,
            timeRange:{
                values: [10, 80]
            }
        }
    }

    onRheostatValUpdated = (payload) => {
        this.setState({
            timeRange: payload
        })
    }
    onSliderDragStart = () => {
        this.setState({scrollEnabled:false})
    }
    onSliderDragEnd = () => {
        this.setState({scrollEnabled:true})
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{paddingTop: 20, paddingHorizontal:15}} scrollEnabled={this.state.scrollEnabled}>
                    <Text style={{fontWeight:'800'}}>Example</Text>

                    <View style={{flex:1, paddingTop: 20, paddingBottom: 80}}>
                        <Text style={{marginTop: 15}}>
                                {Moment.utc().startOf('day').add(this.state.timeRange.values[0], 'minutes').format('hh:mm A')}
                                -
                                {Moment.utc().startOf('day').add(this.state.timeRange.values[1], 'minutes').format('hh:mm A')}
                        </Text>
                        <Rheostat values={this.props.values} min={0} max={1440}
                                  snapPoints={this.props.snapPoints}
                                  snap={true}
                                  onValuesUpdated={this.onRheostatValUpdated}
                                  onSliderDragStart={this.onSliderDragStart}
                                  onSliderDragEnd={this.onSliderDragEnd}

                        />
                        <BarRheostat values={this.props.values} min={0} max={1440}
                                     snap={true} snapPoints={this.props.snapPoints}
                                     svgData = {this.props.svgData}
                                     onValuesUpdated={this.onRheostatValUpdated}/>
                        <AreaRheostat values={this.props.values} min={0} max={1440}
                                      svgData = {areaSvgData}
                        />
                    </View>
                    <View>
                        <Text style={{fontWeight:'800'}}>Example with styled-component</Text>
                        <ThemeProvider theme={theme}>
                            <View>
                        <BarRheostat values={this.props.values} min={0} max={1440}
                                      svgData = {areaSvgData}
                        />
                        <AreaRheostat values={this.props.values} min={0} max={1440}
                                      theme={{themeColor: '#8bc34a', grey: '#fafafa'}}
                                      svgData = {areaSvgData}
                        />
                            </View>
                        </ThemeProvider>
                    </View>
                </ScrollView>
        )
    }
}
RheostatExample.defaultProps = defaultProps;
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import linear from '../algorithms/linear';
import DefaultHandler from '../components/DefaultHandler';
import { PERCENT_EMPTY, PERCENT_FULL, VERTICAL } from '../constants/SliderConstants';
import DefaultProgressBar from '../components/DefaultProgressBar';

type HandlersState = {
  min: number;
  max: number;
  values: number[];
};
type RheostatTypes = {
  disabled?: boolean;
  max: number;
  min: number;
  onPress?: () => void;
  onChange?: () => void;
  onSliderDragEnd?: () => void;
  onSliderDragMove?: () => void;
  onSliderDragStart?: () => void;
  onValuesUpdated?: (state:HandlersState) => void,
  orientation?: 'horizontal'| 'vertical';
  algorithm?: {
    getPosition: (value:number, min:number, max:number)=> number;
    getValue: (pos:number, min:number, max:number) => number;
  };
  handle?: React.ElementType;
  pitComponent?: React.ElementType;
  pitPoints?: number[];
  progressBar?: React.ElementType;
  children?: React.ReactNode;
  snap?: boolean;
  snapPoints?: number[];
  values: number[];
  getNextHandlePosition?: null,
  theme: undefined,
  svgData?: number[],
};
const withRheostat = (ChartCompo: any = null) => (props: RheostatTypes) => {
  const {
    progressBar: ProgressBar = DefaultProgressBar,
    handle: Handle = DefaultHandler,
    pitPoints,
    pitComponent: PitComponent,
    algorithm = linear,
    orientation = 'horizontal',
    max,
    min,
    values: inputValues,
    snap,
    snapPoints,
    children = null,
    svgData,
  } = props;
  let previousHandlePos: number[]; // logging start coords at start of each onPanResponderGrant
  const [handlePos, setHandlePos] = useState(() => inputValues.map((value) => new Animated.Value(
    algorithm.getPosition(value, min, max),
  )));
  const [values, setValues] = useState(() => inputValues.map((value) => new Animated.Value(
    value,
  )));
  useEffect(() => {
    setHandlePos(inputValues.map((value) => new Animated.Value(
      algorithm.getPosition(value, min, max),
    )));
    setValues(inputValues.map((value) => new Animated.Value(value)));
  }, [inputValues[0], inputValues[1]]); // NOQA

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [handleDimensions, setHandleDimensions] = useState({ width: 0, height: 0 });
  const customPanResponder = (idx: number, start: () => void,
    move: (idx: number, gestureState: PanResponderGestureState) => void,
    end: () => void) => PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => start(),
    onPanResponderMove: (_evt, gestureState) => move(idx, gestureState),
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: () => end(),
    onPanResponderTerminate: () => end(),
  });
  const getPublicState = () => ({
    max,
    min,
    values: values.map((value) => (value as any).__getValue()),
  });
  const getClosestSnapPoint = (value: number) => {
    if (!snapPoints?.length) return value;

    return snapPoints.reduce((snapTo, snapP) => (
      Math.abs(snapTo - value) < Math.abs(snapP - value) ? snapTo : snapP
    ));
  };
  const getSnapPosition = (positionPercent: number) => {
    if (!snap) return positionPercent;
    const value = algorithm.getValue(positionPercent, min, max);
    const snapValue = getClosestSnapPoint(value);
    return algorithm.getPosition(snapValue, min, max);
  };
  const startSlide = () => {
    const {
      onSliderDragStart,
    } = props;
      onSliderDragStart && onSliderDragStart(); //eslint-disable-line
    previousHandlePos = handlePos.map((value) => (value as any).__getValue());
  };
  const validatePosition = (idx: number, proposedPosition: number) => {
    const nextPosition = proposedPosition;
    const handlePercentage = orientation === VERTICAL
      ? ((handleDimensions.width / containerSize.height) * PERCENT_FULL) / 2
      : ((handleDimensions.width / containerSize.width) * PERCENT_FULL) / 2;
      // nextPosition should be handlePos[idx-1] < nextPosition < handlePos[idx+1]
    return Math.max(
      Math.min(
        nextPosition,
        handlePos[idx + 1] !== undefined
          ? (handlePos[idx + 1] as any).__getValue() - handlePercentage
          : PERCENT_FULL, // 100% is the highest value
      ),
      handlePos[idx - 1] !== undefined
        ? (handlePos[idx - 1] as any).__getValue() + handlePercentage
        : PERCENT_EMPTY, // 0% is the lowest value
    );
  };
  const getNextState = (idx: number, proposedPosition: number) => {
    const actualPosition = validatePosition(idx, proposedPosition);
    values.forEach((value, index) => (
      index === idx && value.setValue(algorithm.getValue(actualPosition, min, max))
    ));
    handlePos.forEach((value, index) => (
      index === idx && value.setValue(actualPosition)
    ));
    return {
      handlePos,
      // values: nextHandlePos.map(pos => algorithm.getValue(pos, min, max)),
      values,
    };
  };
  const moveSlide = (idx: number, gestureState: PanResponderGestureState) => {
    const {
      onValuesUpdated,
    } = props;
    const {
      width,
    } = containerSize;
    const proposedPosition = (gestureState.dx / width) * PERCENT_FULL + previousHandlePos[idx];
    const snapPosition = getSnapPosition(proposedPosition);
    getNextState(idx, snapPosition);
    if (onValuesUpdated) onValuesUpdated(getPublicState());
  };
  const endSlide = () => {
    const { onSliderDragEnd } = props;
    if (onSliderDragEnd) onSliderDragEnd();
  };
  const panResponders = useMemo(() => handlePos.map(
    (_val, idx) => customPanResponder(idx, startSlide, moveSlide, endSlide),
  ), [containerSize, handleDimensions]);
  const pitStyleCache = useRef<{ [key: number]: any; }>({});

  const getHandleDimensions = (event: LayoutChangeEvent) => {
    const {
      width, height,
    } = event.nativeEvent.layout;
    setHandleDimensions({ width, height });
  };
  const getRheostatDimensions = (event: LayoutChangeEvent) => {
    const {
      width, height,
    } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };
  const getProgressStyle = (idx: number) => {
    const { width } = containerSize;
    const pos = handlePos[idx].interpolate({
      inputRange: [0, 100],
      outputRange: [0, width],
    });
    if (idx === 0) {
      return orientation === 'vertical'
        ? { height: pos, top: 0 }
        : { left: 0, width: pos };
    }
    const prevValue = handlePos[idx - 1].interpolate({
      inputRange: [0, 100],
      outputRange: [0, -width],
    });
    const prevPos = handlePos[idx - 1].interpolate({
      inputRange: [0, 100],
      outputRange: [0, width],
    });
    const diffValue = Animated.add(pos, prevValue);
    return orientation === 'vertical'
      ? { transform: [{ translateY: prevPos }], height: diffValue }
      : { transform: [{ translateX: prevPos }], width: diffValue };
  };
  return (
    <View style={[{
      marginTop: 30,
      marginHorizontal: 10,
      position: 'relative',
    }]}
    >
      {ChartCompo && (
      <ChartCompo
        handlePos={handlePos}
        data={svgData}
        width={containerSize.width}
      />
      )}
      {handlePos.map((value, idx) => {
        const pos = value.interpolate({
          inputRange: [0, 100],
          outputRange: [0, containerSize.width],
        });
        const handleStyle = orientation === 'vertical'
          ? { transform: [{ translateY: pos }] }
          : { transform: [{ translateX: pos }] };
        return (
          <Animated.View
            style={[Style.handleContainer, handleStyle]}
            {...panResponders[idx].panHandlers}
            onLayout={getHandleDimensions}
            renderToHardwareTextureAndroid
            key={`handle-${idx}`}
          >
            <Handle style={[Style.handle]} />
          </Animated.View>
        );
      })}
      <View
        onLayout={getRheostatDimensions}
        style={[Style.container, orientation === 'horizontal' && Style.rheostatHorizontal]}
      >
        <View style={[Style.rheostatBackground, Style.rheostatHorizontalBackground]} />
        {handlePos.map((_value, idx, arr) => {
          if (idx === 0 && arr.length > 1) {
            return null;
          }
          return (
            <Animated.View
              key={`progress-bar-${idx}`}
              renderToHardwareTextureAndroid
              style={[{ position: 'absolute', height: 'auto' }, getProgressStyle(idx)]}
            >
              <ProgressBar />
            </Animated.View>
          );
        })}
        {PitComponent && pitPoints?.map((n) => {
          let pitStyle = pitStyleCache.current[n];
          if (!pitStyle) {
            const pos = algorithm.getPosition(n, min, max);
            pitStyle = orientation === 'vertical'
              ? { top: `${pos}%`, position: 'absolute' }
              : { left: `${pos}%`, position: 'absolute' };
            pitStyleCache.current[n] = pitStyle;
          }
          return (
            <PitComponent key={`pit-${n}`} style={pitStyle}>{n}</PitComponent>
          );
        })}
        {children}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({

  rheostatHorizontal: {
    position: 'relative',
  },
  handle: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  handleContainer: {
    backgroundColor: 'yellow',
    zIndex: 3,
    position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: -15,
    bottom: -15,
  },
  container: {
    justifyContent: 'center',
  },
  rheostatBackground: {
    // backgroundColor: '#fcfcfc',
    borderColor: '#d8d8d8',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    position: 'relative',
  },
  rheostatHorizontalBackground: {
    height: 1,
    width: '100%',
  },
  rheostatProgress: {
    position: 'absolute',
  },
  rheostatHorizontalProgress: {
    height: 13,
    top: 2,
  },
  fullTrack: {
    flexDirection: 'row',
  },
  track: {
    justifyContent: 'center',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
export default withRheostat;

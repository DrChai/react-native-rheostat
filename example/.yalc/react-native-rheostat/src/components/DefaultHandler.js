import React from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight } from 'react-native';

const RoundedButtonText = styled.Text.attrs(props => ({
  selected: props.selected || false,
}))`
   color: ${props => (props.selected ? 'white'
    : (props.theme.rheostat && props.theme.rheostat.themeColor) || 'palevioletred')};
   font-size: 12px;
   font-weight: 700;
`;

RoundedButtonText.defaultProps = {
  theme: {
    rheostat: {
      themeColor: 'palevioletred',
      grey: '#d8d8d8',
    },
  },
};

const RoundedButton = ({
  style, selected, children, ...props
}) => (
  <TouchableHighlight style={style} underlayColor="rgba(245,219,227,0.8)">
    <RoundedButtonText selected={selected} {...props}>
      {children}
    </RoundedButtonText>
  </TouchableHighlight>
);

const DefaultHandler = styled(RoundedButton).attrs(props => ({
  selected: props.selected || false,
}))`
  background-color: ${props => (props.selected
    ? (props.theme.rheostat && props.theme.rheostat.themeColor) || 'palevioletred' : 'transparent')};
  padding: 0;
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border: ${props => (props.theme.rheostat && props.theme.rheostat.themeColor) || 'palevioletred'} solid 2px;
`;

DefaultHandler.defaultProps = {
  theme: {
    rheostat: {
      themeColor: 'palevioletred',
      grey: '#d8d8d8',
    },
  },
};

export default DefaultHandler;

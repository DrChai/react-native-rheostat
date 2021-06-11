import React from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import styled from './styled-components';

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  children?: React.ReactNode;
};
type ButtonTextProps = {
  selected: boolean;
};
const RoundedButtonText = styled.Text.attrs<ButtonTextProps>((props) => ({
  selected: props.selected || false,
}))<ButtonTextProps>`
   color: ${(props) => (props.selected ? 'white'
    : (props.theme.rheostat?.themeColor) || 'palevioletred')};
   font-size: 12px;
   font-weight: 700;
`;

const RoundedButton = ({
  style, selected = false, children,
}:ButtonProps) => (
  <TouchableHighlight style={style} underlayColor="rgba(245,219,227,0.8)">
    <RoundedButtonText selected={selected}>
      {children}
    </RoundedButtonText>
  </TouchableHighlight>
);

const DefaultHandler = styled(RoundedButton).attrs((props) => ({
  selected: props.selected || false,
}))`
  background-color: ${(props) => (props.selected
    ? (props.theme.rheostat?.themeColor) || 'palevioletred' : 'transparent')};
  padding: 0;
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.theme.rheostat?.themeColor) || 'palevioletred'} solid 2px;
`;

export default DefaultHandler;

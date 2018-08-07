import React from "react";
import styled from "styled-components";
import {TouchableHighlight} from "react-native";

const RoundedButtonText = styled.Text.attrs({
    selected: props => props.selected || false,
})`
   color: ${props => props.selected? 'white': props.theme.themeColor};
   font-size: 12px;
   font-weight: 700;
`

const RoundedButton = ({style, selected, children, ...props}) => (
    <TouchableHighlight style={style} {...props} underlayColor='rgba(245,219,227,0.8)'>
        <RoundedButtonText selected={selected} >
            {children}
        </RoundedButtonText>
    </TouchableHighlight>)

const DefaultHandler = styled(RoundedButton).attrs({
    selected: props => props.selected || false,
})`
  background-color: ${props => props.selected? props.theme.themeColor: 'transparent'};
  padding: 0;
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme.themeColor} solid 2px;
`;
DefaultHandler.defaultProps = {
    theme: {
        themeColor: 'palevioletred',
        grey: '#d8d8d8'
    }
}
export default DefaultHandler
import React from "react";
import styled from "styled-components";

const DefaultProgressBar = styled.View`
   background-color: ${props =>  props.theme.themeColor};
   /*position: absolute;*/
   height: 4px;
   /*top: 0;*/
`

DefaultProgressBar.defaultProps = {
    theme: {
        themeColor: 'palevioletred',
    }
}
export default DefaultProgressBar
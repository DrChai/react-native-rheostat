import styled from 'styled-components/native';

const DefaultProgressBar = styled.View`
   background-color: ${props => (props.theme.rheostat && props.theme.rheostat.themeColor) || 'palevioletred'};
   /*position: absolute;*/
   height: 4px;
   /*top: 0;*/
`;
DefaultProgressBar.defaultProps = {
  rheostat: {
    theme: {
      themeColor: 'palevioletred',
    },
  },
};
export default DefaultProgressBar;

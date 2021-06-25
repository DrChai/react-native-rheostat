import styled from './styled-components';

const DefaultProgressBar = styled.View`
   background-color: ${(props) => (props.theme.rheostat && props.theme.rheostat.themeColor) || 'palevioletred'};
   /*position: absolute;*/
   height: 4px;
   /*top: 0;*/
`;

export default DefaultProgressBar;

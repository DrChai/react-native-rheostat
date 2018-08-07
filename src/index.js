import {
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    HORIZONTAL,
    VERTICAL,
    PERCENT_FULL,
    PERCENT_EMPTY,
    DEFAULT_STEP,
    KEYS,
} from "./constants/SliderConstants";
import withRheostat from './hoc/withRheostat'
import AreaChart from './charts/AreaChart'
import BarChart from './charts/BarChart'
import linear from './algorithms/linear';
import DefaultHandler from "./components/DefaultHandler";
import DefaultProgressBar from "./components/DefaultProgressBar";


const Rheostat = withRheostat()

const AreaRheostat = withRheostat(AreaChart)

const BarRheostat = withRheostat(BarChart)

export {
    AreaRheostat,
    BarRheostat
};
export default Rheostat
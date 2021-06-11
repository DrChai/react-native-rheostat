import withRheostat from './hoc/withRheostat';
import AreaChart from './charts/AreaChart';
// import BarChart from './charts/NBarChart';


const Rheostat = withRheostat();

const AreaRheostat = withRheostat(AreaChart);

// const BarRheostat = withRheostat(BarChart);

export {
  Rheostat as default,
  AreaRheostat,
  // BarRheostat,
  withRheostat,
};

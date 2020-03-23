/** placeholder function, the real execution of ForceLayout is through the iline worker */
import ForceLayout from '../force/ForceLayout';

const forceOptions = {};

export default () => {
  onmessage = e => {
    const { data } = e;
    /** parser an object with method */
    const newForceOptions = JSON.parse(JSON.stringify(forceOptions), (key, value) => {
      if (typeof value === 'string' && value.indexOf('function ') === 0) {
        // @ts-ignore
        return eval(`(${value})`);
      }
      return value;
    });

    const simulation = new ForceLayout(newForceOptions);
    simulation.setData(data);

    simulation.register('render', (forceData: any) => {
      // @ts-ignore
      postMessage(forceData);
    });

    simulation.start();
  };
};

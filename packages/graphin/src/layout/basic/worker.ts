/** placeholder function, the real execution of ForceLayout is through the iline worker */
import ForceLayout from '../force/ForceLayout';

const forceOptions = {};

export default () => {
  onmessage = (e) => {
    const { data } = e;
    /** parser an object with method */
    const newForceOptions = JSON.parse(JSON.stringify(forceOptions), (key, value) => {
      if (typeof value === 'string' && value.indexOf('function ') === 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // eslint-disable-next-line no-eval
        return eval(`(${value})`);
      }
      return value;
    });

    const simulation = new ForceLayout({
      ...newForceOptions,
      done: () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        postMessage({
          done: true,
        });
        if (newForceOptions.done) newForceOptions.done();
      },
    });
    simulation.setData(data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    simulation.register('render', (forceData: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      postMessage({ forceData, done: false });
    });

    simulation.start();
  };
};

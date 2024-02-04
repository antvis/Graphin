import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEvent = (callback: Function) => {
  const callbackRef = React.useRef<Function>();
  callbackRef.current = callback;
  const event = React.useCallback((...args: any[]) => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current.call(null, ...args);
    }
  }, []);
  return event;
};

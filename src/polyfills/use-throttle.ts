/* 
1. Takes a callback and delay
2. First Time Immediately Invoked
3. After that invoked after delay
*/

type Throttle = (...args: any[]) => void;

type ThrottleHandler = (callback: Throttle, delay: number) => Throttle;

const useThrottle: ThrottleHandler = (callback, delay): Throttle => {
  let flag: boolean = true;

  return function () {
    if (flag) {
      flag = false;
      let args = Array.from(arguments);

      setTimeout(() => {
        callback.call(null, ...args);
        flag = true;
      }, delay);
    }
  };
};

export default useThrottle;

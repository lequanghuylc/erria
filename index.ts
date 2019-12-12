import { isAsync, isPromise } from './isAsync';

export default function erria(func : Function, ...args) : [any, Error] | Promise<[any, Error]> | any {
  let useResolve = false;
  try {
    const exec = func(...args);
    if (isPromise(exec)) {
      useResolve = true;
      return new Promise((resolve) => {
        exec
        .then(result => resolve([result, null]))
        .catch(err => resolve([null, err]))
      });
    } else {
      return [exec, null];
    }
  } catch(err) {
    if (useResolve) {
      return new Promise((resolve) => {
        resolve([null, err])
      });
    } else {
      return [null, err];
    }
  }
};
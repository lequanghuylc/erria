import { isAsync, isPromise } from './isAsync';

export default function erria(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor): any {

  if (typeof target[propertyName] !== 'function') return;
  const method = propertyDesciptor.value;

  propertyDesciptor.value = function (...args: any[]) {
    try {
      const initialExec = method.apply(this, args);
      if (isPromise(initialExec)) {
        return new Promise((resolve) => {
          initialExec
          .then(res => resolve([res, null]))
          .catch(err => resolve([null, err]));
        })
      } else {
        return [initialExec, null];
      }
    } catch(err) {
      return [null, err];
    }
  }

  // if (isAsync(method)) {
  //   propertyDesciptor.value = async function (...args: any[]) {
  //     try {
  //       let result = await method.apply(this, args);
  //       if (isPromise(result)) result = await result;
  //       return [result, null];
  //     } catch(err) {
  //       return [null, err]
  //     }
  //   }
  // } else {
  //   propertyDesciptor.value = function (...args: any[]) {
  //     try {
  //       const result = method.apply(this, args);
  //       return [result, null];
  //     } catch(err) {
  //       return [null, err]
  //     }
  //   }
  // }

  return propertyDesciptor;
};
import { isAsync } from './isAsync';

export default function erria(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor): any {

  if (typeof target[propertyName] !== 'function') return;
  const method = propertyDesciptor.value;

  if (isAsync(method)) {
    propertyDesciptor.value = async function (...args: any[]) {
      try {
        const result = await method.apply(this, args);
        return [result, null];
      } catch(err) {
        return [null, err]
      }
    }
  } else {
    propertyDesciptor.value = function (...args: any[]) {
      try {
        const result = method.apply(this, args);
        return [result, null];
      } catch(err) {
        return [null, err]
      }
    }
  }

  return propertyDesciptor;
};
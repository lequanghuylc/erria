// credit to stackoverflow

export function isAsync (func) {
  const string = func.toString().trim();

  return !!(
      // native
      string.match(/^async /) ||
      // babel (this may change, but hey...)
      string.match(/return _ref[^\.]*\.apply/)
      // insert your other dirty transpiler check

      // there are other more complex situations that maybe require you to check the return line for a *promise*
  );
}

export function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
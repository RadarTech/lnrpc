/**
 * Add an empty object as the first argument if no argument was passed
 * @param  {Function} func
 * @return {any}
 */
export function defaultEmptyArg(func: (...args: any[]) => any): any {
  return function(...args: any[]) {
    // 2 is used, rather than 1, because of the callback.
    if (args.length < 2) {
      args.unshift({});
    }
    return func.apply(this, args);
  };
}

/**
 * Add an empty object as the first argument if no argument was passed
 * @param  {Function} func The function being called
 * @param  {boolean} hasCallback Whether or not the passed function has a callback
 * @return {any}
 */
export function defaultEmptyArg(func: (...args: any[]) => any, hasCallback: boolean = true): any {
  return function(...args: any[]) {
    if (args.length < (hasCallback ? 2 : 1)) {
      args.unshift({});
    }
    return func.apply(this, args);
  };
}

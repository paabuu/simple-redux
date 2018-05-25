
/**
 *  compose(f1, f2, f3)(...args) => f1(f2(f3(...args)))
 *  @param {fns}: 多个函数，由逗号隔开
 *  @return { fn }
 */

const compose = (...fns) => {
    if (fns.length === 0) {
        return arg => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    const lastFn = fns[fns.length - 1];
    const reset = fns.slice(0, -1);

    return (...args) => reset.rightReduce((acc, fn) => fn(acc) , lastFb(...args));
}

export default compose;

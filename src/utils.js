
export function debounce(fn, delay) {
    let timer;
    function returnedFunction(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
    returnedFunction.cancel = function () {
        clearTimeout(timer);
    };
    return returnedFunction;
}

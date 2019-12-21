"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAsync_1 = require("./isAsync");
function erria(func, ...args) {
    let useResolve = false;
    try {
        const exec = func(...args);
        if (isAsync_1.isPromise(exec)) {
            useResolve = true;
            return new Promise((resolve) => {
                exec
                    .then(result => resolve([result, null]))
                    .catch(err => resolve([null, err]));
            });
        }
        else {
            return [exec, null];
        }
    }
    catch (err) {
        if (useResolve) {
            return new Promise((resolve) => {
                resolve([null, err]);
            });
        }
        else {
            return [null, err];
        }
    }
}
exports.default = erria;
;
//# sourceMappingURL=index.js.map
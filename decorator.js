"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAsync_1 = require("./isAsync");
function erria(target, propertyName, propertyDesciptor) {
    if (typeof target[propertyName] !== 'function')
        return;
    const method = propertyDesciptor.value;
    if (isAsync_1.isAsync(method)) {
        propertyDesciptor.value = async function (...args) {
            try {
                const result = await method.apply(this, args);
                return [result, null];
            }
            catch (err) {
                return [null, err];
            }
        };
    }
    else {
        propertyDesciptor.value = function (...args) {
            try {
                const result = method.apply(this, args);
                return [result, null];
            }
            catch (err) {
                return [null, err];
            }
        };
    }
    return propertyDesciptor;
}
exports.default = erria;
;
//# sourceMappingURL=decorator.js.map
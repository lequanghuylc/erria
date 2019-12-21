"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const decorator_1 = require("./decorator");
const simpleAsync = (something) => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(something);
        reject(new Error("Fail intentionally"));
    }, 2000);
});
const simpleSync = () => {
    const foo = {};
    return foo.bar.failIntentionally();
};
class Foo {
    async bar() {
        const res = await simpleAsync(200);
        return res;
    }
}
__decorate([
    decorator_1.default
], Foo.prototype, "bar", null);
const start = async () => {
    const [res, err] = await index_1.default(simpleAsync, 100);
    console.log([res, err]);
    const [res2, err2] = index_1.default(simpleSync);
    console.log([res2, err2]);
    const foo = new Foo();
    const [res3, err3] = await foo.bar();
    console.log([res3, err3]);
};
start();
//# sourceMappingURL=test.js.map
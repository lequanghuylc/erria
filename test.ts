import erria from './index';
import erriaDeco from './decorator';

const simpleAsync = (something) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(something);
    reject(new Error("Fail intentionally"))
  }, 2000);
});

const simpleSync = () => {
  const foo : any = {};
  return foo.bar.failIntentionally();
};

class Foo {

  @erriaDeco
  async bar() : Promise<[any, Error] | any> {
    const res = await simpleAsync(200);
    return res;
  }
}

const start = async () => {
  const [res, err] = await erria(simpleAsync, 100);
  console.log([res, err]);

  const [res2, err2] = erria(simpleSync);
  console.log([res2, err2]);

  const foo = new Foo();
  const [res3, err3] = await foo.bar();
  console.log([res3, err3]);
};

start();
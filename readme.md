## Erria

**Erria** (Error in array) is inspired by the way Golang function can return mutiple value. Reduce the need of try catch code blocks.

## Install

```
yarn add erria
```
or
```
npm i --save erria
```

## Usage

This module is written in Typescript, pull requesta for regular js project are welcomed

### Regular synchronous and asynchronous function

```
  import erria from 'erria';

  const start = async () => {
    const [res, err] = await erria(simpleAsync, someParameter, someMoreParameter);
    console.log([res, err]);

    const [res2, err2] = erria(simpleSync);
    console.log([res2, err2]);
  };

  start();
```

### Decorator

```
  import erria from 'erria/decorator';

  class Foo {

    @erria
    async bar() : Promise<[any, Error] | any> {
      const res = await simpleAsync(someParameter);
      return res;
    }
  }

  const start = async () => {
    const foo = new Foo();
    const [res3, err3] = await foo.bar();
    console.log([res3, err3]);
  };

  start();
```
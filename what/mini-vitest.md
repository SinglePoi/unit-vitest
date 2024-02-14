# mini-vitest-runner

实现简易的 vitest runner


## test

```ts
const tests = []

export function test(name, callback) {
    tests.push({ name, callback })
}
```

## run

```ts
export function run() {
    for(const test of tests) {
        test.callback()
    }
}
```

## it

```ts
export const it = test
```

## expect

```ts
export function expect(actual) {
    return {
        toBe(expected) {
            if(actual === expected) {
            } else {
                throw Error()
            }
        }
    }
}
```

## test.only

```ts
const onlys = []
test.only = (name, callback) => {
    onlys.push({ name, callback })
}

export function run() {
    const suit = onlys.length > 0 ? onlys : tests
    for(const test of suit) {
        try {
            test.callback()
            console.log('ok')
        } catch(error) {
            throw Error(error)
        }
    }
}
```

## beforeAll

```ts
const beforeAlls = []

export function beforeAll(callback) {
    beforeAlls.push(callback)
}

export function run() {
    for(beforeAllCallback of beforeAlls) {
        beforeAllCallback()
    }
    const suit = onlys.length > 0 ? onlys : tests
    for(const test of suit) {
        try {
            test.callback()
            console.log('ok')
        } catch(error) {
            throw Error(error)
        }
    }
}
```

## beforeEach

```ts
const beforeEachs = []

export function beforeEach(callback) {
    beforeEachs.push(callback)
}

export function run() {
    for(beforeAllCallback of beforeAlls) {
        beforeAllCallback()
    }
    const suit = onlys.length > 0 ? onlys : tests
    for(const test of suit) {
        for(const beforeEachCallbcak of beforeEachs) {
            beforeEachCallback()
        }
        try {
            test.callback()
            console.log('ok')
        } catch(error) {
            throw Error(error)
        }
    }
}
```

## describe

```ts
export function describe(name, callback) {
    callback()
}
```

## 执行命令

### 获取全局文件
```js
import glob from 'glob'

const files = glob.sync('*.spec.js')
```

### 获取文件内容

```js
import fs from 'fs/promises'

for(const file of files) {
    const fileContent = await fs.readFile(file, 'utf-8')
    // await runModule(fileContent)
    // 执行 run
    await runModule(fileContent + ";import {run} from './index.js'; run()")
}
```

### 打包并执行

```js
import { build } from esbuild

async function runModule(fileContent) {
    // 打包
    const result = await build({
        stdin: {
            contents: fileContent,
            resolveDir: process.cwd(), // 文件地址
        },
        write: false,
        bundle: true,
        target: 'esnext',
    });
    // 执行
    new Function(resule.outputFiles[0].text){}
}
```
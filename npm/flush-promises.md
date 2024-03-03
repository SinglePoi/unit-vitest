# flush-promises

执行所有的 promise，无论嵌套

## 安装

```shell
pnpm add flush-promises -D
```

## 使用

```js
test('', () => {
    await flushPromises()
})
```

## 核心

```js
var scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

function flushPromises() {
    return new Promise((resolve) => {
        scheduler(resolve)
    })
}

module.exports = flushPromises
```

flushPromise 会返回一个 Promise，其中使用了 setTimeout

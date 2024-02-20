# 程序间接输入其二

1. 环境变量
2. 全局 global
3. 间接层的处理技巧

## 环境变量

在 node.js 环境中可以通过 process.env 获取，如果使用了 Vite 或 Webpack 可以用 import.meta.env 来获取

如果在单测中需要设置环境变量，为了不影响其他用例，在当前用例最后需要还原设置的环境变量。Vitest 提供了满足要求的一组 api

```ts
test('', () => {
    vi.stubEnv('USER_AGE', 18)
    // ...
    vi.unstubAllEnvs()
})
```

一般会配合 afterEach 使用  

## global

vi.stubGlobal()

## 间接层

使用间接层可以很好的将间接输入的问题转换为处理函数的问题，这样就可以使用 vi.mock 统一处理了

以 环境变量 举例，先将 import.meta.env 封装为一个获取函数作为间接层

```ts
export function getUserAge() {
    return import.meta.env.VITE_USER_AGE
}
```

接着在测试中使用这个获取函数

```ts
vi.mock('./env', () => {
    return {
        getUserAge: () => 18
    }
})

test('', () => {
    getUserAge() // 18
})
```

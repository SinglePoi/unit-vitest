# 间接输入

间接输入指的是逻辑依赖于外部模块

## stub 存根

```ts
function add() {
    return userAge() + 2
}
```

如何为 add 编写单元测试呢？首先要抓住主要：add 函数的逻辑主体在于 `+2`，无论外部依赖的 userAge 取何值，最终都要进行加二运算  

而且为了避免 userAge 返回值对测试用例的干扰，可以使用 vitest 提供的 vi.mock 对 userAge 进行代理

```ts
import { vi } from 'vitest'

vi.mock('./user', ()=> {
    return {
        userAge: () => 2, // 同步
        fetchApi: () => Promise.resolve(2) // 异步
    }
})
```

这样 userAge 的返回值就掌握在了自己的手里，当然这种方式是改变了这个测试模块中所有 userAge 的值，如果只需要更改单个测试用例的值，可以采用以下方式

```ts
vi.mock('./user')

test('', /**async*/() => {
    vi.mocked(userAge).mockReturnValue(2)
    // 或
    vi.doMock('./user', () => {
        return {
            userAge: () => 2
        }
    })
    const { add } = await import('./index')
})
```

## 第三方模块

以 axios 为例

```ts
vi.mock('axios')

test('', () => {
    vi.mocked(axios/**.get .post*/).mockResolveValue({ name: 'xiaohong', age: 18 })
})
```

## 类

```ts
vi.mock('./User', () => {
    return {
        cUser: class User {
            getAge: () => 2
        }
    }
})
```

## 常量

```ts
vi.mock('./User', () => {
    return {
        [常量]: 'value'
    }
})
```

## 注意点

vi.mock 是在测试模块中完全替换第三方值的，如果期望在替换的时候还能保留原始值，可以使用 mock 回调函数的参数来实现

```ts
vi.mock('./config', async (importOriginal) => {
    const config = await importOriginal()
    return {
        ...config as any,
        getAge: () => 2
    }
})

```

或者使用 vi.importActual

```ts
const config = await vi.importActual('./config')
```

更推荐使用参数的方式来引入原始值

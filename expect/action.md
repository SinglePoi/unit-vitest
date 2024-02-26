# 行为验证

行为验证就是对交互行为造成的结果的验证。对于能够会改变状态的行为，如果所有交互都是按预期进行的，那么状态的变更结果也应该是符合预期的

行为验证与状态验证的区别在于，状态验证将状态作为验证的目标，而行为验证则是判断逻辑执行与否，例如目标函数是否被调用？执行函数的入参是什么？或者目标函数被调用的次数？这些都可以通过 mock 来获取

mock 除了本身提供模拟数据的功能外，对交互信息的记录是行为验证的最大依仗

```ts
test('', () => {
    const dataBase = new DataBase()
    vi.spyOn(dataBase, 'add')

    expect(dataBase.add).toBeCalled()
})
```

vi.spyOn 方法会为 dataBase 的 add 函数添加了一些监控 api ，例如后续的 toBeCalled 就是调用了其中的 api 来完成预期判断

或者使用另一种方式

```ts
test('', () => {
    DataBase.prototype.add = vi.fn()
})
```

## 对第三方库的验证

因为多数的第三方库是不暴露数据结构或对应的获取函数的，因此只能使用行为方式来判断是否成功

例如对一个第三方库，如何去验证是否调用了 login api，有以下几种方式

```ts
vi.mock('第三方库', () => {
    return {
        login: vi.fn()
    }
})

test('', () => {
    login('zhanghao', 'mima')

    expect(login).toBeCalled() // 被调用
                 .toBeCalledWith('zhanghao', 'mima') // 入参
                 .toBeCalledTimes(2) // 调用次数
})
```

如果监控的函数需要返回值，有两种方式

```ts
vi.mock('./www', () => {
    return {
        login: vi.fn().mockReturnValue(true)
        // 或
        login: vi.fn(() => true)
    }
})
```

## 缺点

行为验证需要暴露内部细节，这会破坏封装性，不便于后续的维护

并且最大的问题在于，行为验证只注重函数是否执行，而无视函数内部逻辑是否正确

综上所述，更推荐使用状态验证

## 使用的时机

1. 无法获取到状态的变化
2. 
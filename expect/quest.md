# 快速反馈

执行测试系统的时候，它必须要非常快，只有这样开发者才愿意频繁的去执行测试。只有频繁的执行单元测试，我们才能及时的发现问题  

为了保证单测的速度，需要处理掉程序中会导致处拖累处理速度的逻辑，一般会是异步逻辑

## setTimeout

```ts
class User {
    id: string

    constructor(id: string) {
        this.id = id
    }

    fetchData(callback: (data: string) => void, delay:number): void {
        setTimeout(() => {
            const data = `Data for user with id: ${this.id}`;
            callback(data)
        }, delay)
    }
}
```

因为单测执行是同步的，因此无法获取到异步的结果，需要额外的 api 来帮助测试跳过等待异步的时间

```ts
test('', () => {
    vi.useFakeTimers();

    const user = new User('1')
    const callback = vi.fn()
    user.fetchData(callback, 100)

    vi.advanceTimersByTime(100) // 时间快进 100 ms
    vi.advanceTimersToNextTimer() // 快进到下一次事件循环
    expect(callback).toBeCalledWith('Data for user with id: 1')
})
```

这只是针对一个异步函数，如果是多个的异步函数，可以使用 vi.runAllTimes 来跳过所有的等待时间

```ts
test('', () => {
    vi.useFakeTimers();
    // ...
    vi.runAllTimes()
})
```

## setInterval

```ts
export function sayHi() {
    setInterval(() => {
        console.log('hi')
    }, 100)
}
```

对于这个案例，因为无法在状态上反馈行为的变化，因此只能采用行为验证，通过是否调用了 console.log 来判断是否正确执行逻辑

```ts
test('', () => {
    vi.spyOn(console, 'log');

    sayHi()
    // 调用时是否以 hi 为参数
    expect(console.log).toBeCallWith('hi')
})
```

在进行快速反馈操作时，因为 setInterval 是反复执行的，因此不能使用 runAllTimes，但可以使用另外两种方式

```ts
test('', () => {
    vi.useFakeTimers()

    vi.advanceTimersByTime(100)
    vi.advanceTimersToNextTimer()
})
```

## 嵌套异步

advanceTimersToNextTimer 还有一个隐藏的好处，它可以一次性跳过任何嵌套的异步函数

```ts
export function sayHi() {
    setTimeout(() => {
        setInterval(() => {
            console.log('hi')
        }, 100)
    }, 100)
}
```

对于这些的嵌套 advanceTimersByTime 需要执行两次，而 advanceTimersToNextTimer 只需要一次

```ts
test('', () => {
    vi.useFakeTimers()

    vi.advanceTimersByTime(100)
    vi.advanceTimersByTime(100)
    // 或
    vi.advanceTimersByTime(200)
    // 等同
    vi.advanceTimersToNextTimer()
})
```

## Promise

对于 Promise 可以直接使用 async/await 的方式

```ts
test('', async () => {
    const result = await fetchData()
    expect(result).toBe('1')
})
```

如果 Promise 中嵌套着 setTimeout 逻辑，虽然也可以进行测试，但毕竟 await 会一直等待 setTimeout 执行完毕，有违快速反馈的初衷。这样就只能使用 adavanceTimeByTime，注意这时就不能再加 await 了

```ts
test('', () => {
    vi.useFakeTimers()
    const result = fetchData()
    vi.advanceTimersByTime(100)

    expect(result).resolves.toBe('1')
})
```

这里的注意点在于

- 不能再使用 await，因为这样无法执行快速反馈操作
- expect 需要使用 resolves 来获取 Promise 里的值

还有一个例子

```ts
export class View {
    count: number = 1
    render() {
        Promise.resolve()
        .then(() => {
            this.count = 2
        })
        .then(() => {
            this.count = 3
        })
    }
}
```

对于这样的多次 Promise，await 只能等待第一次 promise 的执行，也就是 count = 2  
这个时候没有办法，只能使用第三方库来解决这个问题，使用 flush-promise，具体安装过程可以查看目录中的第三方库

```ts
test('', () => {
    const view = new View()
    view.render()
    await flushPromises()

    expect(view.count).toBe(3)
})
```

# 可预测性

定义为对特定入参给予可预测性的输出，也就是对固定的输入返回固定的输出。程序具备可预测性在编写单测时会额外的轻松

但也有些情况无法满足可预测性，举几个例子
1. 随机性
2. 时效性

随机数的存在直接使得程序不满足固定入参固定出参的规则；而具备时效性的程序也会使得测试在过期时不再满足预期结果

怎样对这两种程序进行测试呢

## 随机性

有这样一个函数，它接受一个数字类型的参数，并随机返回入参大小的字符串

```ts
export function randomString(length: number): string {
    let result = ''
    const characters = 'yutufyghiojifvoirekfwaeqf'
    for(let i=0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }
    return result
}
```

在不停的输入相同参数的情况下，randomString 函数会返回不同的内容，对于这种不可预测性的函数，可以借用 vi.spyOn 工具对产生随机的方法进行替换

```ts
test('', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => {
        return 0.1
    })
})
```

当 Math.random() 会只会返回 0.1 的时候，程序就具备了可预测性

## 时效性

有这样一个函数，通过判断今天是否是周五，如果是则输出‘开心’，否则输出‘不开心’

```ts
export function checkFriday(): string {
    const today = new Date()
    if(today.getDay() === 5) {
        return 'happy'
    } else {
        return 'sad'
    }
}
```

这样的函数只会在周五的那天才会输出 happy，其他时候都会输出 sad。所幸 vi 提供了设置系统时间的方法

```ts
test('', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 3, 21))

    expect(checkFriday()).toBe('happy')
    vi.useRealTimers()
})
```

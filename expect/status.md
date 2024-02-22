# 状态验证

什么是状态？当前系统的属性或数据结构，验证的目的就是为了获取状态是否发生了变化  
在这个过程中，测试不需要了解程序的内部逻辑，只需要关注程序的最终状态或数据结构是否符合预期
这样的好处在于，无论程序的实现细节怎样重构都不会影响测试的进行

就像这个例子

```ts
class Counter {
    private count: number
    constructor() {
        this.count = 0
    }
    increment(): void {
        this.count++
    }
    getCount() {
        return this.count
    }
}
```

虽然它的状态存在于内部，但可以借用方法的形式将其取出

```ts
test('', () => {
    const count = new Counter()
    count.increment()

    expect(count.getCount()).toBe(1)
})
```

后续无论 increment 的逻辑怎样变化，都不会影响到测试的执行

```ts
increment() {
    this.count--
    this.count++
    this.count++
}
```
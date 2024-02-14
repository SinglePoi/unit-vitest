# 常用的 Vitest API

## test 和 it

如果之前有体验过单元测试的同学可能会发现，有的测试单元是用的 test 声明的，而有的是用 it。从功能上来讲，两者的作用是相同的，都是创建一个测试用例  。而两者的区别主要在于书写风格  
``` ts
it('his name is cxr', () => {
    expect(user.name).toBe('cxr')
})

test('his name is cxr', () => {
    expect(user.name).toBe('cxr')
})
```
it 来源于 BDD (行为驱动开发)，它是在 TDD (测试驱动开发)的基础上扩展而来的；BDD 要求开发人员以 it should xxx 的模式去描述测试行为，因此就有了 it API  
而 test API 来自于 Jest 框架，Jest 认为 test 比 it 更语义化更易理解。为了贴近开发人员的习惯，Jest 同时也支持了 it API  
Vitest 更是如此，新生的框架更需要兼容老一辈的习惯，因此 Vitest 同时支持 test / it 语法

## describe

你可以将 describe 看作是一个套件，它可以包含大量的 test 或 it 测试用例。主要的目的在于将相同行为的测试组合在一起，方便测试代码的维护  
对于测试框架来说，describe 允许框架一组一组的执行测试用例
``` ts
describe('user', () => {
    test('his name is cxr', () => {
        expect(user.name).toBe('cxr')
    })

    test('his age is 30', () => {
        expect(user.age).toBe(30)
    })

    describe('home', () => {
        // describe 允许嵌套
        // 但为了书写清晰，不推荐嵌套过多
    })
})
```

## expect

表示对测试行为结果的期望，它允许通过各种方式去描述实际与预期的差距  
以下是几种常见的描述

```ts
it('tobe', () => {
    expect(行为的结果).toBe(预期) // 类型于 ===
    expect().toEqual() // 两个引用类型的比较
    expect().toBeTruthy() // 真值，无参
    expect().toBeFalsy() // 假值，无参
    expect().toContain() // 数组或  string 是否包含目标值
    expect(() => fn()).toThrow(抛出的错误信息) // 函数是否抛出异常
})
```

## setup 和 teardown
setup 和 teardown 分别对应测试步骤中的准备数据和拆卸。在 setup 阶段的 API 有 beforeEach、beforeAll；teardown 阶段的 API 有 afterEach 和 afterAll  
beforeEach 和 AfterEach 和每个测试用例强相关，分别在执行测试的前后执行
beforeAll 和 afterAll 和每个测试文件相关联，在整个测试的生命周期中，它们只会执行一次，分别在开始和结束位置  
它们的执行顺序为 ` beforeAll -> beforeEach -> afterEach -> afterAll  `

```ts
beforeAll(() => {
    console.log('before all')
    return () => {
        // 等同于 afterAll
        // 可以直接用到 beforeAll 的变量
        // 顺序在真实 afterAll 之后
    }
}) 
beforeEach(() => {
    console.log('before each')
    return () => {
        // 等同于 afterEach
        // 同
    }
}) 
test('should one', () => {
    console.log('it should one')
})
test('should two', () => {
    console.log('it should two')
})
afterEach(()) => {
    console.log('after each')
}) 
afterAll(() => {
    console.log('after all')
}) 

result is 
- before all
- before each
- it should one
- after each
- before each
- it should two
- after each
- after all
```

## Test API

```typescript
// describe 等同

test.skip() // 跳过测试单元  
test.only() // 仅执行修饰测试单元  
test.todo() // 待办测试任务  
```

## scripts

```json
// in package.json
scripts: {
    'test': 'vitest', // watch 模式执行测试
    'test': 'vitest run', // 每次重启测试
}
```

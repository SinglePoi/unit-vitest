# 创建测试数据的三种方式

## 内联

将测试数据定义在测试用例中的行为称为内联  

```typescript
it('', () => {
    const data = {}
})
```

优点就是具备当前测试的针对性；而缺点也很明显，每一个测试用例都需要单独创建测试数据，不具备复用性

## 委托

通过一个工厂来创建针对性的测试数据

```ts
function createData() { return {} }

it('', () => {
    const data = createData()
})
```

将创建过程封装，具有较高的复用性

## 隐式

利用框架提供的方法，例如 Vitest 中的 beforeEach 来为每一个测试用例创建测试数据

```ts
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
    setActivePinia(createPinia)
})
```

但是这种方式分割了原本的逻辑，导致可读性变差

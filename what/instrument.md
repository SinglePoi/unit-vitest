# 测试框架
选择一个你最熟悉的测试框架，主流的测试框架包括 Jest、Vitest、Mocha 等。个人更推荐使用 Vitest，因为它天然的支持 ESM 和 TS，无需再做额外的配置。当然也可以选择其他框架，无论选择哪种框架，它们的 API 和使用方式都是相近的
## 安装

```shell
pnpm add vitest -D
```

vitest 的运行依赖于 Vite，但这并不意味着开发者还需要额外安装 Vite。实际上，Vitest 的运行环境是与项目环境相隔离的，在执行测试任务时，Vitest 会自动启动自带的 Vite ，从而不影响项目的实际运行  

## 脚本
使用 test 来描述一个测试单元

```typescript  
import { test, expect } from 'vitest'
import { useStore } from './store'

test('描述测试预期', () => {
    // 执行测试任务
    // 测试上下文 / fixtrue
    // 1. 准备数据
    const store = useStore()
    // 2 调用逻辑
    store.add('测试')
    // 3. 验证
    // 因为数据驱动视图，只要数据满足要求，就可以认为视图符合预期
    // expect 预期，toBe 匹配器
    expect(store.has('测试')).toBe(true)
    // 4. 拆卸
    store.clean()
})
```

测试文件一般遵守 [功能].spec.ts 的命名规范

## 执行

```shell
npx vitest
```

在执行测试任务时，Vitest 会在整个项目中查找符合命名规范的脚本，然后去执行它们

# Vitest 和 Jest 的区别

## 开箱即用

Vitest 支持开箱即用。但 Jest 还需要额外的配置，对新手来说不太友好  
Jest 需要安装以下依赖
```shell
pnpm i 
    jest 
    typescript 
    @types/jest // 类型提示
    ts-jest     // 为 jest 提供 ts 支持
```
接着使用 `npx ts-jest config:init` 命令创建 jest.config.js

## 共用 vite 配置
构建、开发、测试共用同一套配置

## 社区更活跃

vitest 的社区比 Jest 更活跃，且 Vue 已经全面拥抱 vitest，在稳定性上可以减少顾虑

## 全局引入

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true
    }
}) 
```

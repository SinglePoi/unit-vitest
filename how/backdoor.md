# 后门测试

通过调用内部 API 的方式叫做 round-trip ，但有时候是没有内部的公开 API 供我们调用的，这种时候就只能使用后门操作的方式  
例如一个待办列表，需要测试它的 remove 能力，首先就需要通过 add api 准备一条数据才行。但该列表暂未提供 add api，就只能去直接操作列表本身，这种不经过官方去改写的方式称为后门测试

```ts
test('', () => {
    const store = useStore()
    const todo = {
        id: 1,
        title: 'eat'
    }

    store.todos.push(todo)
    store.removeTodo(todo.id)

    expect(store.todos.length).toBe(0)
})
```

后面测试是极不安全的，首先需要暴露列表的数据结构，其次直接对数据结构的操作无疑是对业务逻辑的重复，且这种重复是静态的，数据结构的改动会直接冲突已有的后门测试，是不推荐的。优先使用官方提供的公共 API

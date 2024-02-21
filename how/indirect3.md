# 程序的间接输入其三
使用依赖注入，通过将外部模块以参数的形式传递到函数内部的方式实现依赖模块之间的解耦

```ts
import { readFileSync } from 'fs'

export function readAndProcessFile(filePath: string) : string {
    const content: string = readFileSync(filePath, { encoding: 'utf-8' });
    return content + '-> test unit'
}
```

在 `readAndProcessaFile` 函数中，`readFileSync` 就是依赖的外部模块。通过参数的改造可以使 content 的求值脱离对 fs 模块的强依赖

```ts
export function readAndProcessFile(filePath: string, fileReader) : string {
    const content: string = fileReader.read(filePath, { encoding: 'utf-8' });
    return content + '-> test unit'
}
```

而对 fs 的维护工作就交给 class 了

```ts
import { readFileSync } from 'fs'

class FileReader {
    read(filePath: string) {
        readFileSync(filePath, { encoding: 'utf-8' })
    }
}
```

接着去调用

```ts
const result = readAndProcessFile('xxx.txt', new FileReader())
```

这样后续替换模块时只需要改动 read 方法内的依赖即可

## 单测

这种方式就不再需要使用 vi.mock 去代理依赖模块了，只需要自定义一个依赖，例如

```ts
test('', () => {
    class StubReader {
        read() {
            return 'hello world'
        }
    }

    const result = readAndProcessFile('.text', new StubReader())
    expect(result).toBe('hello world-> test unit')
})

```

## 依赖倒置原则

SOLID 原则中的 D ，指的是高层模块不应该依赖低层模块，两者都应该依赖于它们的抽象；抽象不应该依赖于细节，细节应该依赖于抽象

在案例中，readAndProcessFile 指的是高层模块，fs 是底层模块；在经过改造后，FileReader Class 成为了两者的抽象，使得 readAndProcessFile 依赖 FileReader，而 fs 用于实现 FileReader.read 的细节，任意地去替换 fs 但不会影响 readAndProcessFile 的实现

依赖替换的现象被称为 ‘程序接缝’，它允许我们将一个组件与其他组件隔离开来。通过创建接缝，我们可以轻松地替换一个组件的实现，而不影响其他代码。
这有助于将组件之间的耦合度降至最低，使得代码更加模块化。

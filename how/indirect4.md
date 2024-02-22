# 程序的间接输入其四

接着第三部分的内容，本章处理程序接缝的问题，也就是对 class 的处理方式

## 构造函数

将依赖通过构造器进行传递

```diff
interface FileReader {
    read(filePath: string): string;
}

class ReadAndProcessFile {
    private _filetReader: FileReader;
+   constructor(fileReader: string) {
+       this._fileReader = fileReader
+   }

    run() {
        const content = this._fileReader.read(filePath, { encoding: 'utf-8' })
        return content + '-> unit test'
    }
}
```

### 单测

```ts
test('', () => {
    class StubFileReader implements FileReader {
        read(filePath: string): string {
            return 'cxr'
        }
    }
    const readAndProcessFile = new ReadAndProcessFile(new StubFileReader())

    expect(readAndProcessFile.run()).toBe('cxr-> unit test')
})
```

## 属性

```diff
class ReadAndProcessFile {
    private _filetReader: FileReader;
    run() {
        const content = this._fileReader.read(filePath, { encoding: 'utf-8' })
        return content + '-> unit test'
    }
+   get fileReader() {
+       return this._fileReader
+   }
+   set fileReader(fileReader: FileReader) {
+       this._fileReader = fileReader
+   }
}
```

### 单测

```ts
test('', () => {
    class StubFileReader implements FileReader {
        read(filePath: string): string {
            return 'cxr'
        }
    }
    const readAndProcessFile = new ReadAndProcessFile()
    readAndProcessFile.fileReader(new StubFileReader())

    expect(readAndProcessFile.run()).toBe('cxr-> unit test')
})
```

## 方法

```diff
class ReadAndProcessFile {
    private _filetReader: FileReader;
    run() {
        const content = this._fileReader.read(filePath, { encoding: 'utf-8' })
        return content + '-> unit test'
    }
+   getFileReader() {
+       return this._fileReader
+   }
+   setFileReader(fileReader: FileReader) {
+       this._fileReader = fileReader
+   }
}
```

### 单测

```ts
test('', () => {
    class StubFileReader implements FileReader {
        read(filePath: string): string {
            return 'cxr'
        }
    }
    const readAndProcessFile = new ReadAndProcessFile()
    readAndProcessFile.setFileReader(new StubFileReader())

    expect(readAndProcessFile.run()).toBe('cxr-> unit test')
})
```

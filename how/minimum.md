# 最小准备数据原则

在准备测试数据的时候，没必要提供和当前要测试的功能无关的数据，有效保持单元测试的可读性  

有时候为了能够减少没必要的数据，会更改业务层的代码，为没必要的数据增加默认值。有些人认为，为了测试代码去更改业务代码是不应该的  

```ts
// 业务代码的改动 以 User 为例
class User {
    name: string;
    age: number;
    address: string;

    // ↓ 设置默认值
    constructor(
        name: string;
        age: number = 18;
        address: string = 'beijing'
    ) {
        this.name = name;
        this.age = age;
        this.addres = address;
    }

    buy() {
        return `User ${this.name} bought ${product.name}`
    }
}

// 测试代码
test('', () => {
    const user = new User('cxr');
    const product = new Product('book')

    const result = user.buy(product)

    expect(result).toBe('User Cxr bought Book')

})
```

但实际上，我们需要明白：单元测试也是业务代码的用户之一，为了提升用户体验而更改业务是非常有必要的。这也是为什么说单元测试可以驱动开发者设计出更完善的程序 api 的原因  

还有一种方式可以减少不必要数据的方式，就是利用委托的形式，来为测试用例隐藏这部分数据  

```ts
// ↓ user 委托
function createUser(name: string) {
    return new User(name, 18, 'beijing')
}
// ↓ product 委托
function createProduct(name: string) {
    return new Product(name, 1, 'a good book')
}

test('', ()=> {
    const user = createUser('cxr');
    const product = createProduct('book')

    const result = user.buy(product)

    expect(result).toBe('User Cxr bought Book')
})
```

第三种就是使用虚拟对象去模拟目标数据  

```ts
test('', () => {
    const user = createUser('cxr');
    // ↓ 虚拟对象
    const product = { name: 'book' } as Product 

    const result = user.buy(product)

    expect(result).toBe('User Cxr bought Book')
})

```

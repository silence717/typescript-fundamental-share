# typescript-fundamental-share
typesctipt基础知识分享
## typescript 是什么?

* 由微软开发的，开源的`javascript`类型的超集

* 可编译成纯`javascript`

* `babel7`支持编译

## 为什么添加类型？

* 作为开发者来说，增加代码约束和假设

* 捕获普通的错误

* 将一些代码错误从运行时提前到到编译时暴露

## 初识

### install

`npm install -g typescript`

### compile

举个🌰

```ts
// helloworld.ts 文件
function add(a, b) {
    return a + b;
}
add(1, 2);
```

`tsc example/helloworld.ts`

```js
// 编译后生成 helloworld.js 文件，和 helloworld.ts 内容并没有任何区别
function add(a, b) {
    return a + b;
}
add(1, 2);
```



修改`helloworld.ts`文件，添加类型

```ts
function add(a:number, b:number) {
    return a + b;
}

add(1, '22');
```

`tsc example/helloworld.ts`

```bash
example/helloworld.ts:5:8 - error TS2345: Argument of type '"22"' is not assignable to parameter of type 'number'.

5 add(1, '22');
         ~~~~


Found 1 error.
```

很明显提示：`'22'`不能赋值给类型`number`的参数

## 项目配置中 tsconfig.json

### overview

如果一个目录下存在一个`tsconfig.json`文件，那么意味着而这个目录是 typescript 的根目录。配置中指定了用来编译这个项目的根文件和编译选项。

## 示例文件

```json
{
    "compilerOptions": {
        "module": "es2015",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true,
        // 使用严格模式
        "strict": true,
        // 允许编译javascript文件
        "allowJs": true,
        // 编译的代码目标版本
        "target": "es5",
        "outDir": "dist",
        "rootDir": "src"        
    },
    // 指定一个包含相对或者绝对文件路径的列表。
    "files": [
        "core.ts"
    ],
    // 指定编译那些目录下的文件,files被配置的也会包含进来
     "include": [
        "src/**/*"
    ],
    // 排除的文件目录，可以排除 include 引入的文件。但是 files 属性明确指定的文件不会被排除。
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

完整的compilerOptions列表，点击查看 [编辑器选项]([https://www.typescriptlang.org/docs/handbook/compiler-options.html](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

> PS：可以为空，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

## 基础类型

支持与`javascript`几乎相同的数据类型

### 布尔值

```ts
let isShow: boolean = false;
```

### 数字类型

```ts
let id: number = 2;
```

### 字符串

```ts
let username: string = 'fang';
let fullname: string = `${username}.yang`;
```

### 数组

```ts
// 1. 在元素后面直接加[]
let a: number[] = [1, 2, 3];
// 2.使用泛型，Array<元素类型>
let b: Array<number> = [4, 5, 6];
```

### 元组Tuple

允许表示一个一直元素数量和类型的数组，各元素的类型不必相同。

```ts
let cc: [number, string] = [
    1,
    'abc'
];
// 这个时候调用push方法，允许的数据类型为string或者number
cc.push(222);
```

### 枚举

```ts
// 默认情况下，从`0`开始为元素编号。
enum Color { Red, Green, Blue };
let c: Color = Color.Green;

// 手动修改编号从N开始
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green;

// 全部采用手动赋值
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green;
```

## null 和 undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

### any

初写ts的之最爱，不知道或者不确定是什么类型，希望通过类型检查，可直接使用any，这样就可以随意更改它的赋值类型，而不会报错，但是非常不推荐这么使用，失去了编写ts代码的乐趣。

```ts
let notSure: any = 4;
notSure = 'string';
notSure = false;
```

### void

`void`与`any`相反，它表示没有任何类型。

```ts
// 一个函数没有返回值，设置它的返回类型为void
function log(): void() {
    console.log('print something');
}

// 对于声明一个变量没什么用，因为只能赋值为 null 或者 undefined
let unusable: void = undefined;
```

### never

表示的是那些永不存在的值的类型。例如：抛出异常

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

### Object

非原始类型，也就是除`number`,`string`,`boolean`,`symbol`,`null`和`undefind`之外的类型。

```ts
let user = {
    id: 1,
    name: 'silence'
};
```

## 接口

ts的核心原则之一就是对所具有的结构数据进行类型检查。简单的理解为定义数据模型。

#### 基础使用

```ts
// 普通函数的类型检查，校验名为 name 类型为 string 的属性
function printUser(user: { name: string}) {
    console.log(user.name);
}

let user1 = { id: 1, name: 'silence' };

printUser(user1);
```

如果当好几个函数都使用到 user 的时候，需要每个 function 都校验该属性是否存在和类型是否正确，再糟糕的对象的属性很多的时候就比较灾难了。



试着使用 interface 来定义一下

```ts
// IUser就是一个接口，好比一个名字。代表id属性为number，name属性为string。
interface IUser {
    id: number;
    name: string
}

function printUser1(user: IUser) {
    console.log(user.name);
}
```

> 对于`interface`类型检查不会校验属性的顺序，只校验是否存在和类型是否正确。

#### 可选属性

接口中的属性不是所有都是必须的。在属性的后面加一个`?`符号即为可选属性。

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}
  
function createSquare(config: SquareConfig): {color: string; area: number} {
    
    let newSquare = {color: "white", area: 100};
    
    if (config.color) {
        newSquare.color = config.color;
    }
    
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
  
let mySquare = createSquare({color: "black"});
```

#### 只读属性

在属性名前面添加`readonly`。

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 1, y: 2 };
// Cannot assign to 'x' because it is a read-only property.ts(2540)
p1.x = 4; 
```

> 其余函数类型、可索引的类型、类类型自行学习。。。

#### 接口继承

```ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

一个类也可以继承多个接口

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### 类

#### public

在ts里面，成员都默认为`public`。当然也可以明确的将一个成员标记为`public`。

```ts
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

#### private

标记为私有成员的时候，它就不能在声明它的类外部访问了。

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
// Property 'name' is private and only accessible within class 'Animal'.ts(2341)
new Animal("Cat").name;
```

#### protected

与`private`很相似，但是`protected`可在派生类中访问。即为：子类和访问父类具有的`protected`的成员。

```ts
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

#### readonly

设置为只读，只读属性必须的在声明或者在构造函数里被初始化。

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

### 函数

为函数添加类型：为每个参数添加类型，再为函数添加返回值的类型。ts能够根据返回语句推断出返回值类型，因此我们通常会省略它。

```ts
// 命名函数
function add(x: number, y: number): number {
    return x + y;
}
// 匿名函数
let myAdd = function(x: number, y: number): number { return x + y; };
```

#### 可选参数

在参数名旁使用`?`实现可选参数的功能。

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }       
}

let result1 = buildName("Bob");
// Expected 1-2 arguments, but got 3.ts(2554)
let result2 = buildName("Bob", "Adams", "Sr.");
let result3 = buildName("Bob", "Adams");  
```

> 可选参数必须跟在必须参数的后面。

#### 默认参数

可以为参数提供一个默认值当做用户满意传递这个参数，或者传递的为`undefined`。

```ts
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");  
```

> 有默认值的参数不必放在必须餐宿后面，但是必须明确传入undefined值来获得默认值。

#### 剩余参数

必要参数，可选参数，默认参数都表示某一个参数。想操作多个参数，但是不知道数量，js中可使用`arguments`来访问所有传入的参数，在ts里可以把所有参数收集到一个变量里面：

```ts
function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
```



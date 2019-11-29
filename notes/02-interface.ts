// 普通函数的类型检查
function printUser(user: { name: string}) {
    console.log(user.name);
}

let user1 = { id: 1, name: 'silence' };

printUser(user1);

// 使用 interface
interface IUser {
    id: number;
    name: string
}

function printUser1(user: IUser) {
    console.log(user.name);
}

// 可选属性
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

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 1, y: 2 };
// Cannot assign to 'x' because it is a read-only property.ts(2540)
p1.x = 4; 

// 接口继承
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

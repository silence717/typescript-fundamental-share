// boolean
let isShow: boolean = false;

// number
let id: number = 2;

// string
let username: string = 'fang';

let fullname: string = `${username}.yang`;

// Array
let a: number[] = [1, 2, 3];
let b: Array<number> = [4, 5, 6];

// 声明一个 any 类型的数组
let aa = [];
aa.push(2);
aa.push('222');

// 声明一个 number 类型的数组
let bb: number[] = [];
bb.push(2);
bb.push('1');


let cc: [number, string] = [
    1,
    'abc'
];

cc.push(222);

// enum

enum Color { Red, Green, Blue };
let c: Color = Color.Green;


// Object
let user = {
    id: 1,
    name: 'silence'
};

user = {
    id: 2
};
// Property 'name' is missing in type '{ id: number; }' but required in type '{ id: number; name: string; }'.ts(2741)
// 01-baiscs.ts(24, 5): 'name' is declared here.
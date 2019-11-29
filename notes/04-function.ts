// 命名函数
function add(x: number, y: number): number {
    return x + y;
}
// 匿名函数
let myAdd = function(x: number, y: number): number { return x + y; };

// 可选参数
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

// 默认参数
function buildName1(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result11 = buildName1("Bob");                  // works correctly now, returns "Bob Smith"
let result22 = buildName1("Bob", undefined);       // still works, also returns "Bob Smith"
let result33 = buildName1("Bob", "Adams", "Sr.");  // error, too many parameters
let result44 = buildName1("Bob", "Adams");  

// 剩余参数
function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
// 类
// public
class Animal {
    
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

// private
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
// Property 'name' is private and only accessible within class 'Animal'.ts(2341)
new Animal("Cat").name;

// protected
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
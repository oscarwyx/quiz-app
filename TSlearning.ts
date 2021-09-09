console.log('Hello, World!');
let helloWorld = "Hello World";
const user = {
    name: "Hayes",
    id : 0,
};
interface User  {
    name: string;
    id:number;
}
type MyBool = true | false;
type carstates = "OPEN" | "CLOSE";
type carseats = 2|4|5|7;
type StringArray = Array<string>;
type Stringwithcararray = Array< {car :string}>;

function getLength(obj: string | string[]){
    return obj.length;
}
let carMakeStringArray = ["BMW","Audi","Benz"];
getLength(carMakeStringArray);

function numberOrString(obj: string| number){
    if (typeof obj === "string"){
        return [obj];
    }
    return obj;    
}

interface SuperCar<Type> {
    add:(obj: Type)=> void;
    get:()=> Type;
}
declare const supercar: SuperCar<string>;
const object = supercar.get();
supercar.add("Maclaren");

interface Point {
    x: number;
    y: number;
}
function logPoint(p: Point){
    console.log(`${p.x},${p.y}`);
}
const point = {x:12,y:26};
logPoint(point);

//add maker
function add_maker(a: number): Function {
  return (b: number)=>a+b;
}

const add10 = add_maker(10);
console.log(add_maker(10)(3));

//map
interface People{
  age: number;
  name: string;
}

const peoples: People[] = [
  {age: 34, name: "lee"},
  {age: 20, name: "kim"},
  {age: 32, name: "park"},
  {age: 19, name: "choi"},
  {age: 40, name: "kang"},
  {age: 4, name: "kim"}
]

function _map_under30 (peoples:People[]):People[] {
  let new_peoples: People[] = [];
  for(let i: number = 0; i<peoples.length; i++) {
    if(peoples[i].age<=30) {
      new_peoples.push(peoples[i]);
    }
  }
  return new_peoples;
}

// console.log(_map_under30(peoples));

function _each(list:unknown[], iter:Function) {
  for(let i:number=0; i<list.length; i++) {
    iter(list[i]);
  }
}

function _filter(list:unknown[], predi: Function){
  let new_peoples:unknown[] = [];
  _each(list, (val:unknown)=>{
    if(predi(val)) {
      new_peoples.push(val);
    }
  })
  return new_peoples;
}

function _map(list:unknown[], mapper: Function) {
  let new_peoples:unknown[] = [];
  _each(list, (val: unknown)=>{
    new_peoples.push(mapper(val));
  })
  return new_peoples;
}

console.log(_filter(peoples, (people:People)=>people.age<=30));
console.log(_map(peoples, (poeple: People)=>poeple.name));

//curry
function _curry(func:Function): Function {  
  return function (a: unknown, b: unknown) {
    return arguments.length==2 ? func(a,b): (b: unknown) => func(a,b)
  }
}


function _curryr(func:Function): Function {  
  return function (a: unknown, b: unknown) {
    return arguments.length==2 ? func(a,b): (b: unknown) => func(b,a)
  }
}

let add = _curry((a:number, b:number)=>a+b);
let add20 = add(20);
console.log(add20(10));

let sub = _curryr((a:number, b:number)=>a-b);
let sub5 = sub(5);
console.log(sub5(10));
console.log(sub(4,6));

//get
let _get = _curryr(function (obj: any, key:string) {
  return obj==null ? undefined : obj[key];
});

let getName = _get('name');

console.log(peoples[0].name);
console.log(getName(peoples[0]));

console.log(
  _map(
    _filter(peoples, (val:People)=>30>=val.age), getName)
  );

  //reduce

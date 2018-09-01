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

let _get = _curryr(function (obj: any, key:string) {
  return obj==null ? undefined : obj[key];
});

function _is_obj(obj: any) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj:any) {
  return _is_obj(obj) ? Object.keys(obj) : [];
}

const _length = _get('length');

function _each(list:any, iter:Function): unknown[]{
  const keys = _keys(list);
  const len = _length(keys);
  for(let i:number=0; i<len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

//reduce
function _rest(list:unknown[], num?: number) {
  let slice = Array.prototype.slice;
  return slice.call(list, num || 1);
}

function _reduce(list:unknown[], iter:Function, memo?:unknown) {
  if(arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function (val: unknown){
    memo = iter(memo, val);
  });
  return memo;
}

function _filter_org(list:unknown[], predi: Function){
  let new_peoples:unknown[] = [];
  _each(list, (val:unknown)=>{
    if(predi(val)) {
      new_peoples.push(val);
    }
  })
  return new_peoples;
}

function _map_org(list:unknown[], mapper: Function) {
  let new_peoples:unknown[] = [];
  _each(list, (val: unknown)=>{
    new_peoples.push(mapper(val));
  })
  return new_peoples;
}

let getName = _get('name');

// pipe
function _pipe(...funcs:Function[]) {
  return (arg:unknown) => _reduce(funcs, 
    function (arg2: unknown, fn:Function)
    {
      return fn(arg2);
    }
    , arg);
}

function _go(arg:unknown, ...funcs:Function[]) {
  _pipe.apply(null, funcs)(arg);
}

_go(
  1, 
  function (a:number) {return a+1;},
  function (a:number) {return a*10;},
  console.log
);

const _map = _curryr(_map_org);
const _filter = _curryr(_filter_org);

_go(peoples, 
  _filter((people:People) => people.age>30),
  _map(getName),
  console.log
);

_go(
  {3:'kk', 4:'jj', 7:'ll'},
  _map((val:string)=>val.toUpperCase()),
  console.log
)

console.log('\n\n===============================\n\n');

function _identity(val: unknown) {
  return val;
}

function _values(data: unknown) {
  return _map(data,_identity);
}

function _pluck(list:unknown[], key:string) {
  return _map(list, _get(key));
}

function _negate(func: Function) {
  return (data: unknown) => !func(data);
}

function _reject(list:unknown[], predi: Function) {
  return _filter(list,_negate(predi));
}

function _compact(list: unknown[]) {
  return _filter(list, _identity);
}

console.log(_compact([1,2,0,false, []]));
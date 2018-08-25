function add(a: number ,b: number): number {
  return a+b;
}

//add maker
function add_maker(a: number): Function {
  return (b: number)=>a+b;
}

const add10 = add_maker(10);

console.log(add10(2));
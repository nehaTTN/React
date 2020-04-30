//Q4. Filter unique array members using Set.
//Q9. Import a module for filtering unique elements in an array.
//Q12. Implement Map and Set using Es6
let uniqueArray=(arr)=>{
  let unique=new Set(arr);
  console.log(unique);
}
let implementingMap=()=>{
  let m=new Map();
  let key1=1;
  let key2=2;
  let key3=3;
  m.set(key1,"One");
  m.set(key2,"Two");
  m.set(key3,"Three");
  console.log(m);
}
module.exports={
  uniqueArray,
  implementingMap
}

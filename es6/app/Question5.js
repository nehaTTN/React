//Find the possible combinations of a string and store them in a MAP
let combinations=(arr)=>{
  let newArr=[];
   if(arr<0)
  return arr;
  for(let i in arr)
  {
    let element=arr[i];
    combinations(arr.join('').replace(element,'').split('')).concat("").map((subCombinations)=>{
      newArr.push([element].concat(subCombinations));
    });
  }
  return newArr;
}
console.log(combinations("a".split('')).map((str)=>{
  return str.join('');
}));


module.exports={combinations}

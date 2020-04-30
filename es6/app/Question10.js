// Write a program to flatten a nested array to single level using arrow functions
let flattenArray=(arr)=>{
  let newArr=[];
  let helper=(arr)=>{
    for(let i=0;i<arr.length;i++)
    {
      let element=arr[i];
      if(Array.isArray(element))
      {
         helper(element);
      }
      else {
        newArr.push(element);
      }
    }

  }
  helper(arr);
  // return newArr;
  console.log("The new array is:"+newArr);
}
module.exports={
  flattenArray
}

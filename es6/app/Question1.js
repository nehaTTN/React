//Q1. Given this array: `[3,62,234,7,23,74,23,76,92]`, Using arrow function, create an array of the numbers greater than `70`.
class Question1
{
  method()
  {
    let arr=[3,62,234,7,23,74,23,76,92];
    let filteredArray=arr.filter((e)=> e>70);
    console.log(filteredArray);
    }

}
export default Question1;

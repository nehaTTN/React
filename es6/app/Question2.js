let a=()=>{
  // a. Select all the list items on the page and convert to array.
  let array=[];
  let list=document.getElementById("navbar").getElementsByTagName("li");
  for(let i=0;i<list.length;i++)
  {
    array.push(list[i].innerHTML);
  }
  console.log(array);
  // b. Filter for only the elements that contain the word 'flexbox'
  console.log("elements that contains only flexbox");
  let word=array.filter((e)=>e.toLowerCase().includes('flexbox'));
  console.log(word);
  // c. Map down to a list of time strings
  let arrayTime= new Array();
  for(let i=0;i<list.length;i++)
  {
    arrayTime.push(list[i].getAttribute("data-time"));
  }
  console.log(arrayTime);
  // d. Map to an array of seconds
  let arraySec=arrayTime.map((a)=>a.split(':')).map((a)=>([a[0]*60+a[1]]));
  let arrayNum=arraySec.map(Number);//Converting it into array of integer
  console.log(arrayNum);
  // e. Reduce to get total using .filter and .map
  let totalTime=arrayNum.reduce((total,time)=>total+time);
  console.log("Total Time",totalTime);

}
export{a}

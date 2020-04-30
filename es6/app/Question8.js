//Q8. Import a module containing the constants and method for calculating area of circle, rectangle, cylinder.
const pi=3.14159;
let areaCircle=(radius)=>{
  let a=pi*radius*radius;
  console.log("Area of circle : ",a.toFixed(4));
}
let areaRectangle=(length,breadth)=>{
  let a=length*breadth;
  console.log("Area of rectangle : ",a);
}
let areaCylinder=(radius,height)=>{
  let a=2*pi*radius*(height+radius);
  console.log("Area of cylinder : ",a.toFixed(4));
}
module.exports = {
    areaCircle,
    areaRectangle,
    areaCylinder
}


import Question1 from './Question1';
import {a} from './Question2';
let call=a();
// const question2 =  require('./Question2');
import Question3 from './Question3';
import Destructing  from './Destructing';

const uniqueSetAndMap =  require('./Question4_9_12');
let arr=[1,2,3,3,4,5,5,6,4,7,8,8,9];
uniqueSetAndMap.uniqueArray(arr);
uniqueSetAndMap.implementingMap();

const question5 =  require('./Question5');

import{Animal,Rabbit,AmericanRabit} from './Question6'
let animal = Animal.run(2);
let rabbit = Rabbit.stop();
let americanRabit=AmericanRabit.hello();

import Question7 from './Question7';

const question8 =  require('./Question8');
question8.areaCircle(2);
question8.areaRectangle(2,4);
question8.areaCylinder(2,4);

const question10 =  require('./Question10');
question10.flattenArray([1,2,[3,[4,5],6]]);

import{LinkedList} from './Question11';
import{stackUsingLL}from './Question13';

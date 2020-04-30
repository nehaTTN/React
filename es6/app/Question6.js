//Write a program to implement inheritance upto 3 classes.The Class must  public variables and static functions.
class Animal {
  constructor(name,speed) {
    this.speed = speed;
    this.name = name;
  }
  static run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  static stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}


class Rabbit extends Animal {
  static hide() {
    console.log(`${this.name} hides!`);
  }

  static stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
}
class AmericanRabit extends Rabbit{
  static hello()
  {
    console.log(`Hello I am ${this.name} from AmericanRabit class`);
  }
}
export{Animal,Rabbit,AmericanRabit};

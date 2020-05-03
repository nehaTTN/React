import React,{Component} from 'react';
import styles from './App.module.css';
import FruitTable from './FruitTable.js';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={ fruits : [
          { id : 1, type : "Mango", quantity : 10 }

      ],
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange=(event)=>{
    // event.preventDefault();
    // let input=event.target.value;
    // let value=input.split("-");
    // this.setState({type:value[0],quantity:value[1]});
    const fruits = [...this.state.fruits];
    let input = event.target.value;
    let [type, quantity] = input.split('-');
    let count = fruits.length;

    let id = (count === 0) ? 1 : fruits[count-1].id + 1;

    fruits.push({
      id, type, quantity
    });

    input = "";

    this.setState({
      fruits
    });
  }
  handleSubmit=(event)=>{
    alert('You have entered '+this.state.type+' with a quantity '+this.state.value);
    event.preventDefault();
  }
  deleteFruitHandler=(index)=>{
    const fruits=[this.state.fruits];
    fruits.splice(index,1);
    this.setState({fruits:fruits})
  }

  render()
  {
    let fruit=[...this.state.fruits];
    let fruitList=fruit.map((fruit)=>
      <FruitTable
      key={fruit.id}
      type={fruit.type}
      quantity={fruit.quantity}
      delete={()=>this.deleteFruitHandler(fruit.id)}
      >
      </FruitTable>
      )
    return (
      <div className={styles.App}>
      < form className={styles.FormText} onSubmit={this.handleSubmit}>
      <input
      type="text"
      placeholder="Please Enter"
      size ="50"
       // value={this.state.value}
      onChange={(event)=>this.handleChange(event)}
      required />
      <input type="submit" value="Submit"/>
      </form>
      <table className={styles.Fruits}>
      <thead>
      <tr>
      <td>NAME</td>
      <td>QUANTITY</td>
      <td>ACTION</td>
      </tr>
      </thead>
      <tbody>{fruitList}</tbody>
      </table>
      </div>
    );
  }

}

export default App;

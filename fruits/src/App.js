import React, { Component } from 'react';
import styles from './App.module.css';
import FruitTable from './FruitTable.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: [
        { id: 1, type: "Mango", quantity: 10 }

      ],
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
    inputChangeHandler = (event) => {
    const newVal=event.target.value;
    this.setState({ input: newVal });
  }
  handleChange = (event) => {
    const fruits = [...this.state.fruits];
    let input = this.state.input;
    let [type, quantity] = input.split('-');
       let count = fruits.length;

    let id = (count === 0) ? 1 : fruits[count - 1].id + 1;

    fruits.push({
      id, type, quantity
    });

    input = "";
    console.log(fruits);

    this.setState({
      fruits, input
    });
  }
  deleteFruitHandler = (index) => {
    const fruits = [...this.state.fruits];
    const deleteIndex=fruits.findIndex((fruit)=>fruit.id===index)
    fruits.splice(deleteIndex, 1);
    this.setState({ fruits })
  }

  render() {
    let fruit = [...this.state.fruits];
    let fruitList = fruit.map((fruit) =>
      <FruitTable
        key={fruit.id}
        type={fruit.type}
        quantity={fruit.quantity}
        delete={() => this.deleteFruitHandler(fruit.id)}
      >
      </FruitTable>
    )
    return (
      <div className={styles.App}>
          <input
          type="text"
          value={this.state.input}
          placeholder="Please enter"
          required
          onChange={(event) => this.inputChangeHandler(event)}
        />
        <button
          onClick={() => this.handleChange()}
        > Submit </button>
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


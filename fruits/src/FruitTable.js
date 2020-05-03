import React,{Component} from 'react';
class FruitTable extends Component{
render()
{
  return(
    <tr>
    <td>{this.props.type}</td>
    <td>{this.props.quantity}</td>
    <td>
    <button onClick={this.props.delete}>DELETE</button>
    </td>
    </tr>

  )
}

}
export default FruitTable;

import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Salad',type:'salad'}
];
const buildControls=(props)=>(
    <div className={styles.BuildControls}>
        <p><strong>Current Price:{props.price}</strong></p>
        {controls.map(ctrl=>(
    <BuildControl 
    key={ctrl.label} 
    label={ctrl.label}
    added={()=>props.ingredientAdded(ctrl.type)}
    removed={()=>props.ingredientRemoved(ctrl.type)}
    disabled2={props.disabled1[ctrl.type]}/>
        ))}
        <button className={styles.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>

);
export default buildControls;
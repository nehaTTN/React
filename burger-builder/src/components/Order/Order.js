import React from 'react';
import styles from './order.module.css';

const order=(props)=>{

    const ingredients=[];
    for(let ingredientsName in props.ingredients)
    {
        ingredients.push({name:ingredientsName,
        amount:props.ingredients[ingredientsName]});
    }
    const ingredientsOutput=ingredients.map(ig=>{
    return<span key={ig.name}>{ig.name}({ig.amount})</span>
    });
    console.log('total price',props.prices)
    return(
   <div className={styles.Order}>
    <p style={{
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px'
    }}>Ingredients:{ingredientsOutput}</p>
    <p><strong>Rs:{props.prices}</strong></p>
    </div>
    );
    }
export default order;
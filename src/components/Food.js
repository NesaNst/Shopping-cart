import React from 'react'

export default function Food(props) {
    const { food, handleAdd } = props;
  return (
    <div className="block">
      <img className="img small" src={food.image} alt={food.name}></img>
      <h3>{food.name}</h3>
      <div>${food.price}</div>
      <div> 
        <button onClick={() => handleAdd(food)}>
            Add to cart
        </button>
      </div>
    </div>
  )
}

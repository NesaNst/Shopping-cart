import React from "react";
import Food from "./Food";

export function Home(props) {
    const { foods, handleAdd } = props;
    
    return(
        <main className="block col-2">
            <h2> Foods </h2>
            <div className="row">
                {foods.map((food) => (
                    <Food
                        key={food.id}
                        food = {food}
                        handleAdd={handleAdd}
                    />
                    
                ))}
            </div>
        </main>
    )
}
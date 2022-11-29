import React from "react";

export default function Basket(props) {
    const {cartItems, handleAdd, handleRemove} = props;
    const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.qty, 0 );
    const taxPrice = itemsPrice* 0.14;
    const shippingPrice = itemsPrice > 20 ? 0 : 5;
    const totalPrice = itemsPrice + taxPrice+shippingPrice;

    return(
        <div className="block col-1">
            <h2> Cart Items </h2>
            <div>
                {cartItems.length === 0 && <div>Cart is empty </div>}
            </div>
            {cartItems.map ((item) => (
                <div key={item.id} className="row">
                    <div className="col-2">{item.name}</div>
                    <div className="col-2"> 
                        <button onClick={() => handleRemove(item)} className="remove">-</button>
                        <button onClick={() => handleAdd(item)} className="add">+</button>
                    </div>
                    <div className="col-2 text-right">
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <>
                <hr></hr>
                <div className="row">
                    <div className="col-2">Items price</div>
                    <div className="col-1 text-right" >${itemsPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-2">Tax price</div>
                    <div className="col-1 text-right" >${taxPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-2">Shipping price</div>
                    <div className="col-1 text-right" >${shippingPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-2"> <strong>Total price </strong></div>
                    <div className="col-1 text-right" > <strong>${totalPrice.toFixed(2)} </strong></div>
                </div>
                <hr/>
                <div className="row">
                    <button className="button1" onClick = {() => alert("That was our project!")}>
                        Checkout
                    </button>
                </div>
                </>
            )}
        </div>
    )
}
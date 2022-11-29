import Header from './components/Header';
import { Home } from './components/Home';
import Basket from './components/Basket';
import { useState, useEffect } from "react";
import axios from 'axios';



function App() {
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  const [oneFoodName, setOneFoodName] = useState([]);
  const [oneFoodPrice, setOneFoodPrice] = useState([]);
  const [oneFoodId, setOneFoodId] = useState([]);



  const API_endpoint = 'http://localhost:5000/api/foods/';

  const [data, setData] = useState({
    name: "",
    price: ""
  })



  const handleChange = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const handleAdd = (food) => {
    const found = cartItems.find((x) => x.id === food.id);
    if (found) {
      setCartItems(cartItems.map((x) =>
        x.id === food.id ? { ...found, qty: found.qty + 1 } : x
      ));
    } else {
      setCartItems([...cartItems, { ...food, qty: 1 }])
    }
  };

  const handleSubmit = async () => {
    await axios.post(API_endpoint, {
      name: data.name,
      price: parseInt(data.price)
    })
      .then(res => {
        console.log(res.data)
      })
  }

  const getByName = async () => {
    const res = await axios.get(API_endpoint + name);
    setOneFoodName(`
            name: ${res.data[0].name}, 
            price: ${res.data[0].price}
    `)
  }

  const getByPrice = async () => {
    const res = await axios.get(API_endpoint + "price/" + price);
    setOneFoodPrice(`
            name: ${res.data[0].name}, 
            price: ${res.data[0].price}
    `)
  }

  const getById = async () => {
    const res = await axios.get(API_endpoint + "id/" + id);
    setOneFoodId(`
            name: ${res.data[0].name}, 
            price: ${res.data[0].price},
            id: ${res.data[0].id}
    `)
  }

  const handleDelete = name => {
    console.log("hi");
    fetch(`API_endpoint+${name}`, {
      method: "DELETE"
    })

  };

  // const handleDelete = (name) => {
  //   const res = axios.delete(`http://localhost:5000/api/foods/Pizza`);
  //   setFoods(Object.values(res))
  //   //foods.filter((food) => food.name !== res.name)
  // }
  // const handleDelete = async (name) => {
  //   await axios.delete("API_endpoint+name")
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // }

  const handleRemove = (food) => {
    const found = cartItems.find((x) => x.id === food.id);
    if (found.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...found, qty: found.qty - 1 } : x
        ))
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("listOfSelectedFoods");
    setCartItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("listOfSelectedFoods", JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    fetch(API_endpoint)
      .then((res) => res.json())
      .then((food) => (setFoods(Object.values(food))));
  }, []);


  return (
    <div className="App col-1">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Home
          foods={foods}
          handleAdd={handleAdd}
        >
        </Home>
        <Basket
          cartItems={cartItems}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        ></Basket>
      </div>
      <div>
        <h3>
          Add a food of your choice:
        </h3>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => handleChange(e)} id="name" value={data.name} placeholder="name of food" type="text" />
          <input onChange={(e) => handleChange(e)} id="price" value={data.price} placeholder="price of food" type="text" />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h3>
          Enter the name of the food you want to delete:
        </h3>
        <form onSubmit={handleDelete}>
          <input onChange={field => setName(field.target.value)} id="delete" type="text" />
          <button onClick={(e) => console.log(e)}>Delete</button>
        </form>
      </div>
      <div>
        <h3>
          Get one food by typing its name:
        </h3>
        <input id="getByName" onChange={field => setName(field.target.value)} type="text" />
        <br />
        {oneFoodName}
        <br />
        <button onClick={getByName}>Get by name</button>
      </div>
      <div>
        <h3>
          Get one food by typing its price:
        </h3>
        <input id="getByPrice" onChange={field => setPrice(field.target.value)} type="text" />
        <br />
        {oneFoodPrice}
        <br />
        <button onClick={getByPrice}>Get by price</button>
      </div>
      <br />
      <div>
        <h3>
          Get one food by typing its id:
        </h3>
        <input id="getById" onChange={field => setId(field.target.value)} type="text" />
        <br />
        {oneFoodId}
        <br />
        <button onClick={getById}>Get by Id</button>
      </div>
    </div>
  );
}

export default App;

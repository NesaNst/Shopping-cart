const express = require('express');
const router = express.Router();
const foods = require('../../Foods');
//const uuid = require("uuid");


/**
 * @route GET api/foods
 * @desc Retrives all foods
 **/
router.get('/', (req, res) => res.json(foods));

/**
 * @ TODO Task 1
 * @route GET api/foods/:id
 * @desc Retrieves task with ID specified in URL
 **/
router.get("/:name", (req,res) => {
    const found = foods.some(food => food.name === req.params.name);
    if (found) {
        res.json(foods.filter(food => food.name === req.params.name));
    } else {
        res.status(400).json({ msg: `No msg with the name of ${req.params.name}`});
    }
});

router.get("/id/:id", (req,res) => {
    const found = foods.some(food => food.id === parseInt(req.params.id));
    if (found) {
        res.json(foods.filter(food => food.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No msg with the id of ${req.params.id}`});
    }
});

router.get("/price/:price", (req,res) => {
    const found = foods.some(food => food.price === parseInt(req.params.price));
    if (found) {
        res.json(foods.filter(food => food.price === parseInt(req.params.price)));
    } else {
        res.status(400).json({ msg: `No msg with the price of ${req.params.price}`});
    }
});

/**
 * @ TODO Task 2
 * @route DELETE api/foods/:id
 * @desc Deletes task with ID specified in URL
 **/
router.delete("/:name", (req,res) => {
    const found = foods.some(food => food.name === req.params.name);
    if (found) {
        res.json({
            msg: `Food ${req.params.name} deleted`,
            foods: foods.filter(food => food.name !== req.params.name)
        })
    } else {
        res.status(400).json({ msg: ` HTTP 400 Bad Request, no msg with the name of ${req.params.name}`});
    }
});

router.post("/", (req,res) => {
    const newFood = {
        id: foods.length+1,
        name: req.body.name,
        price: req.body.price,
        image: "https://images.pexels.com/photos/326279/pexels-photo-326279.jpeg?auto=compress&cs=tinysrgb&w=800"
    };
    if (!newFood.name || !newFood.price){
        return res.status(400).json({ msg: `Food name or price cannot be empty`});
    } else {
        foods.push(newFood);
        res.json(foods);
    }
});




module.exports = router;
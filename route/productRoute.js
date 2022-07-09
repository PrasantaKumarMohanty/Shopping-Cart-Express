const verify = require('../utils/authenticate');
const Product = require('../model/Product');

const productRoute = require('express').Router();

productRoute.post('/', verify, async (req, res) => {
    // console.log(req.user.user.role)
    const { role } = req.user.user
    if (role === "admin") {
        const products = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription,
            inventoryCount: req.body.inventoryCount
        };
        try {

            let savedProduct = await Product.create(products);
            // console.log(savedProduct)
            return res.status(200).json(savedProduct);

        } catch (err) {
            return res.status(400).send(err)
        }

    } else return res.status(500).send("staff is not allowed to add the product")

});

productRoute.get("/", verify, async (req, res) => {
    const { role } = req.user.user

    if (role === 'admin' || role === 'manager') {
        try {
            let productList = await Product.find()
            return res.status(200).json(productList)
        } catch (error) {
            return res.status(400).send(err)

        }
    }
    return res.status(500).json({ message: "staff are not allowed!!" })

})

productRoute.put("/:id", verify, async (req, res) => {
    const { role } = req.user.user
    const { id } = req.params

    const products = {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        inventoryCount: req.body.inventoryCount
    };
    if (role === 'admin' || role === 'manager') {
        try {
            let productList = await Product.findByIdAndUpdate({ _id: id }, products)
            return res.status(200).json(productList)
        } catch (error) {
            return res.status(400).send(err)

        }
    }
    return res.status(500).json({ message: "staff are not allowed!!" })

})

module.exports = productRoute;

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    inventoryCount:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Product', productSchema);

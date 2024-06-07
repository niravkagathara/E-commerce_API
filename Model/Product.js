const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
        name:{
                type:String,
                // require:true,
        },
        productID:{
                type:Number,
        },
        price:{
                type:Number,
        },
        category:{
                type:String,
        },
        // userId:String,
        companyname:{
                type:String
        },
        imageA:{
                type:String,
        },
        Discription:{
                type:String,
        }, 
}); 
module.exports=mongoose.model("Product",ProductSchema) 
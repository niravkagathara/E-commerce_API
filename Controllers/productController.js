const Product = require('../Model/Product');
exports.getallproduct=async (req, resp) => {
    const result = await Product.find();
    if(result.length>0){
        resp.send(result);
        console.log("all product get");
    }
    else{
        resp.send({result:"no product found"});
    }
}
exports.addproduct=async (req, resp) => {
    let product = new Product(req.body);

    let result = await product.save();

    resp.send(result);
    console.log("product add");
}
exports.deleteproduct=async (req,resp)=>{
    let result= await Product.deleteOne({_id:req.params.id});
    resp.send(result);
    console.log("product delete")
}
exports.getproductbyid=async (req,resp)=>{
    let result= await Product.findOne({_id:req.params.id})
    if(result){
    resp.send(result);
    console.log("product get by id")
    }
    else{
        resp.send({result:"no product record found"});
    }
}
exports.updateproduct=async(req,resp)=>{
    let result=await Product.updateOne({_id:req.params.id},{$set:req.body})
    
    resp.send(result);
    console.log('product updated')
}


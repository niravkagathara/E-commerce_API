const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
// const CustomError = require('./Utils/CustomError');
const authrouter = require('./Routes/authrouter');
const productrouter = require('./Routes/productrouter');
// const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
const productController = require('./Controllers/productController');
const authController =require('./Controllers/authController');
const Product = require('./Model/Product');
const User = require('./Model/User');
const CustomError = require('./Utils/CustomError');
const jwt = require('jsonwebtoken');
const multer =require('multer');
const signtoken = (id) => {
   return jwt.sign({ id }, process.env.SECRET_STR, { expiresIn: process.env.LOGIN_EXPIRES })
}
const path =require('path');
const Order = require('./Model/Order');
// app.use('/',authrouter);
// app.use('/product',productrouter);

const storage=multer.diskStorage({
   destination:(  req,file,cb)=>{
    return cb (null,'./upload/images')
   },
   filename:(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
   }
})

const upload=multer({storage})
app.use('/images', express.static('upload/images'))
app.get('/',(req,res)=>{
   res.send('welcome nk api ecom');
});
app.post('/upload',upload.single('file'),(req,res)=>{
   console.log(req.body)
   console.log(req.file.filename)
   res.json({
      success: 1,
      image_url: req.file.filename
  })
});

app.put('/upload/:filename', upload.single('file'), (req, res) => {
   const { filename } = req.params;
   const { file } = req;
   // Here you can handle the logic to update the file with the given filename
   console.log(`Updating file: ${filename}`);
   console.log('New file details:', file);
   res.json({
       success: 1,
       message: `File ${filename} updated successfully`,
       image_url: req.file.filename,
       file_name:`http://localhost:5000/images/${req.file.filename}`
   });
});
app.get('/',authController.protect,authController.restrict('admin'),  async (req, res) => {
    const Students = await User.find();
    const a = res.send(Students);

    console.log('all user get');
    // console.log(a)
})


// app.delete('/',async(req,resp)=>{
//     let result = await User.deleteOne({_id:req.params.id});
//     resp.send(result);
//     console.log('user deleted');
// })

app.delete('/:id',authController.protect,authController.restrict('admin'),async (req, resp) => {
   let result = await User.deleteOne({ _id: req.params.id });
   resp.send(result);
   console.log("user delete")
})

app.post('/add-user',authController.protect,authController.restrict('admin'), async (req, resp) => {
   let product1 = new User(req.body);

   let result = await product1.save();
   resp.send(result);
   console.log("user add");
})
app.get('/:id',authController.protect,authController.restrict('admin'),async (req, resp) => {
   let result = await User.findOne({ _id: req.params.id })
   if (result) {
       resp.send(result);
       console.log("user get by id")
   }
   else {
       resp.send({ result: "no user record found" });
   }
})
app.put('/:id',authController.protect,authController.restrict('admin'),async (req, resp) => {
   let result = await User.updateOne({ _id: req.params.id }, { $set: req.body })

   resp.send(result);
   console.log('user updated')
})

app.post('/register', async (req, resp) => {
   let user = new User(req.body);
   if(user){
       const token = signtoken(user._id);
       const role=user.role;
       const id=user._id;
       const author=user
       let result = await user.save();
       result = result.toObject();
       delete result.password
       resp.status(200).send({user:user,token:token,role:role,id:id});
       // resp.send(token)
       console.log(' user signup')
   } else {
       resp.send({ result: "no user found" });
       // console.log('error user login');
       const error =new CustomError('please signup again',401);

   }
  
});

app.post('/login', async (req, resp,next) => {
   if (req.body.password && req.body.email) {
       let user = await User.findOne(req.body).select("-password");
       if (user) {
           const token = signtoken(user._id);
           const role=user.role;
           const id=user._id;
           const author=user
           resp.status(200).send({user:user,token:token,role:role,id:id});
           // console.log(token);
           console.log(' user login');
       }
       else {
           resp.send({ result: "no user found" });
           // console.log('error user login');
           const error =new CustomError('please login again',401);

       }
   }
   else {
       resp.send({ result: "no user found" });
       const error =new CustomError('user not found',404);

   }
});





app.get('/product/get', async (req, resp,next) => {
   const result = await Product.find();
   if(result.length>0){
       resp.send(result);
       console.log("all product get");
       const err = new CustomError(`network`, 401);
      
   }
   else{
       resp.send({result:"no product found"});
       const err = new CustomError(`network`, 401);
   }
})

app.post('/product/add-product',authController.protect,authController.restrict('admin'),async (req, resp) => {
   let product = new Product(req.body);

   let result = await product.save();

   resp.send(result);
   console.log("product add");
})

app.delete('/product/:id',authController.protect,authController.restrict('admin'),async (req,resp)=>{
   let result= await Product.deleteOne({_id:req.params.id});
   resp.send(result);
   console.log("product delete")
})

app.get('/product/:id',authController.protect,authController.restrict('admin'),async (req,resp)=>{
   let result= await Product.findOne({_id:req.params.id})
   if(result){
   resp.send(result);
   console.log("product get by id")
   }
   else{
       resp.send({result:"no product record found"});
   }
})
app.get('/product/all/:id',async (req,resp)=>{
   let result= await Product.findOne({_id:req.params.id})
   if(result){
   resp.send(result);
   console.log("product get by id")
   }
   else{
       resp.send({result:"no product record found"});
   }
})
app.put('/product/:id',authController.protect,authController.restrict('admin'),async(req,resp)=>{
   let result=await Product.updateOne({_id:req.params.id},{$set:req.body})
   
   resp.send(result);
   console.log('product updated')
})

app.get('/order/get', authController.protect,authController.restrict('admin'),async (req, resp) => {
   const result = await Order.find();
   if(result.length>0){
       resp.send(result);
       console.log("all product get");
   }
   else{
       resp.send({result:"no product found"});
   }
})


app.delete('/order/:id',authController.protect,authController.restrict('admin'),async (req, resp) => {
   let result = await Order.deleteOne({ _id: req.params.id });
   resp.send(result);
   console.log("order delete")
})

app.post('/addorder', async (req, resp) => {
   let product1 = new Order(req.body);

   let result = await product1.save();
   resp.send(result);
   console.log("user order");
})

app.get('/order/:id',authController.protect,authController.restrict('admin'),async (req, resp) => {
   let result = await Order.findOne({ _id: req.params.id })
   if (result) {
       resp.send(result);
       console.log("order get by id")
   }
   else {
       resp.send({ result: "no order record found" });
   }
})




//////////////
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on the server!`
    });
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});
module.exports = app;
 ///////////////////////////////////////////
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static('./public'))
// app.use(bodyParser.urlencoded({ extended: false }))


//error for any route 
// app.all('*', (req, res, next) => {
//     // res.status(404).json({
//     //     status: 'fail',
//     //     message: `Can't find ${req.originalUrl} on the server!`
//     // });
//     // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
//     // err.status = 'fail';
//     // err.statusCode = 404;
//     const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
//     next(err);
// });

//token
// const signtoken=(id)=>{
//     return jwt.sign({id},process.env.SECRET_STR,{expiresIn:process.env.LOGIN_EXPIRES })
//    }
   //user
  
   //admin
//    app.get('/admin', async (req, res) => {
//        const ad = await Admin.find();
//        res.send(ad);
//        console.log('all admin get');
//    })
   
   
//    // app.delete('/admin',async(req,resp)=>{
//    //     let result = await Admin.deleteOne({_id:req.params.id});
//    //     resp.send(result);
//    //     console.log('admin deleted');
//    // })
   
//    app.delete('/admin/:id',async (req,resp)=>{
//        let result= await User.deleteOne({_id:req.params.id});
//        resp.send(result);
//        console.log("user delete")
//    })
   
//    app.post('/add-admin', async (req, resp) => {
//        let producta = new Admin(req.body);
   
//        let result = await producta.save();
   
//        resp.send(result);
//        console.log("admin add");
//    })
//    app.get('/admin/:id',async (req,resp)=>{
//        let result= await Admin.findOne({_id:req.params.id})
//        if(result){
//        resp.send(result);
//        console.log("admin get by id")
//        }
//        else{
//            resp.send({result:"no admin record found"});
//        }
//    })
//    app.put('/admin/:id',async(req,resp)=>{
//        let result=await Admin.updateOne({_id:req.params.id},{$set:req.body})
       
//        resp.send(result);
//        console.log('admin updated')
//    })
   
//    app.post('/adminRegister', async (req, resp) => {
//        let user = new Admin(req.body);
//        let result = await user.save();
//        result = result.toObject();
//        delete result.password
//        resp.send(result);
//        console.log(' admin signup')
//    });
   
//    app.post('/adminLogin', async (req, resp) => {
//        if (req.body.password && req.body.email) {
//            let admin = await Admin.findOne(req.body).select("-password");
//            if (admin) {
//                resp.send(admin);
//                console.log(' admin login');
//            }
//            else {
//                resp.send({ result: "no admin found" });
//                console.log('error admin login');
//            }
//        }
//        else {
//            resp.send({ result: "no admin found" });
//        }
//    });
   
   //products
 
   


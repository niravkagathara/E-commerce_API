const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const CustomError=require('../Utils/CustomError');
const asyncErrorHandler=require('../Utils/asyncErrorHandler');
const util=require('util')
const signtoken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR, { expiresIn: process.env.LOGIN_EXPIRES })
}
exports.getalluser = async (req, res) => {
    const Students = await User.find();
    const a = res.send(Students);

    console.log('all user get');
    // console.log(a)
}

exports.deleteuser = async (req, resp) => {
    let result = await User.deleteOne({ _id: req.params.id });
    resp.send(result);
    console.log("user delete")
}
exports.adduser = async (req, resp) => {
    let product1 = new User(req.body);

    let result = await product1.save();
    resp.send(result);
    console.log("user add");
}
exports.getuserbyid = async (req, resp) => {
    let result = await User.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result);
        console.log("user get by id")
    }
    else {
        resp.send({ result: "no user record found" });
    }
}
exports.updateuser = async (req, resp) => {
    let result = await User.updateOne({ _id: req.params.id }, { $set: req.body })

    resp.send(result);
    console.log('user updated')
}
exports.registeruser = async (req, resp) => {
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
   
}
exports.userlogin = async (req, resp,next) => {
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
        const error =new CustomError('user not found',401);

    }
}




exports.protect =asyncErrorHandler(async (req, res, next) => {
    const testToken = req.headers.authorization
    let token;
    if(testToken && testToken.startsWith('Bearer')) {
        token = testToken.split(' ')[1];
    }
    if(!token){
        next(new CustomError('you are not loged in!',401))
    }

   const decodedtoken= await util.promisify(jwt.verify)(token,process.env.SECRET_STR);

   console.log(decodedtoken)

   const user=await User.findById(decodedtoken.id);
   if(!user){
    const error =new CustomError('the user given token does not exist',401);
    next(error);
   }
   req.user=user
    next();
})

// exports.forgotpassword= (req,res,next)=>{
//     }
// exports.resetpassword=(req,res,next)=>{

// }


exports.restrict=(role)=>{
     return (req,res,next)=>{
        if(req.user.role !== role){
            const error =new CustomError('you do not have permission to perform this action ',403);
            next(error);
        }
        next();
     }
}

// exports.restrict=(...role)=>{
//     return (req,res,next)=>{
//        if(!role.includes(req.user.role)){
//            const error =new CustomError('you do not have permission to perform this action ',403);
//            next(error);
//        }
//        next();
//     }
// }
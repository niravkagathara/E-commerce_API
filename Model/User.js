const mongoose=require('mongoose');
const Schema = new mongoose.Schema({
        name:{
                type:String,
                required:true,
                trim:true
        },
        email:{
                type:String,
                required:true,
                unique:true,
                // lowercase:true
        },
        password:{
                type:String,
                required:true,
                // minlength:8
        },
        photo:{
                type:String, 
        },
        role:{
                type:String,
                enum:['user','admin'],
                default:'user',
                required:false
        }
});
module.exports=mongoose.model("user",Schema) 
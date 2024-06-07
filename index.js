const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
                    .then(
                        () => {
                            console.log("connected");
                        })
                    .catch(
                        () => {
                            console.log('error')
                        });

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('student @ 5000');
})







// //nonBlocking
// // app.get('/Student',(req,res)=>{
// //     Student.find()
// //     .then((data)=>{
// //         res.send(Student);

// //     })
// // })

// //blocking get all
// app.get('/Student', async (req,res)=>{
//     const Students= await Student.find();
//          res.send(Students);
//          console.log(Students)
//  })
 
//  //findone
//  // app.get('/Student/:id',async (req,res)=>{
//  //    const student= await Student.findOne(req.params.id);
//  //         res.send(student);
//  // })
 
 
//  //find
//  // app.get('/Student/:id',async (req,res)=>{
//  //     const student= await Student.find({_id:req.params.id});
//  //          res.send(student);
//  //  })
 
//  // findbyid byid
//  app.get('/Student/:id',async (req,res)=>{
//      const student= await Student.findById(req.params.id);
//      console.log(Student)
//           res.send(student);
//   })
  
//  //delete
//  app.delete('/Student/:id',async (req,res)=>{
//      const Studen= await Student.findById(req.params.id);
//      await Student.deleteOne();  
//      console.log('deleted') 
//      res.send(Studen);
//   })
 
//  //Delete deleteOne
//  //  app.delete('/Student/:id',async (req,res)=>{
//  //     const Stu=await Student.deleteOne({_id:req.params.id});
//  //     res.send(Stu);
//  //  })
 
 
 
//  // app.post('/student',async (req,res)=>{
//  //     const student= new Student({
//  //         _id:new mongoose.Types.ObjectId(),
//  //         StudentName:"asdf",
//  //         StudentRollno:400,
//  //         StudentEnroll:2200,
//  //         StudentImg:"afff"
//  //     });
//  //     await student.save();
//  //     res.send(student);
//  //     console.log('posted')
//  // })
 
//  //post
//  app.post('/student',async (req,res)=>{
//      console.log(req.body)
//      const student= new Student({
//          _id:new mongoose.Types.ObjectId(),
//          StudentName:req.body.StudentName,
//          StudentRollno:req.body.StudentRollno,
//          StudentEnroll:req.body.StudentEnroll,
//          StudentImg:req.body.StudentImg
//      });
//      await student.save();
//      res.send(student);
//      console.log('posted')
//  })
 
 
//  app.patch('/Student/:id',async (req,res)=>{
//      console.log(req.body)
//      const student=await Student.findById(req.params.id);
//      Student.StudentName=req.body.StudentName;
//      Student.StudentRollno=req.body.StudentRollno;
//      Student.StudentEnroll=req.body.StudentEnroll;
//      Student.StudentImg=req.body.StudentImg
 
//   await student.save();
//      res.send(student);
//      console.log(student,'patched')
//  })
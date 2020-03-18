const express=require('express');
const app=express();

const primeRoutes=require('./routes/prime');

app.use('/prime',primeRoutes);



// app.use((req,res,next)=>{
//     res.status(200).json({
        
//             message:"it works!"
        
//     });
// });
module.exports=app;
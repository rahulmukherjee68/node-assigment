const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const primeRoutes=require('./routes/prime');
const userRoutes=require('./routes/user');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/prime',primeRoutes);
app.use('/user',userRoutes);





// app.use((req,res,next)=>{
//     res.status(200).json({
        
//             message:"it works!"
        
//     });
// });
module.exports=app;
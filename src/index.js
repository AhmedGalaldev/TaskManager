const express = require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.port||3000


// app.use((req,res,next)=>{
//         res.status(503).send('the site not avilable now')

// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt=require('jsonwebtoken')
const myFunction=async()=>{
    const token =await jwt.sign({_id:"abc123"},'thisismynewcourse',{expiresIn:"7 days"})

    console.log(token);

    const data=jwt.verify(token,'thisismynewcourse')
    console.log(data);
    
    
}
myFunction()
app.listen(port,()=>{
    console.log("The server listen on port "+port);
    
})
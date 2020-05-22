const express = require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.port||3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log("The server listen on port "+port);
    
})
const User=require('./models/user')
const Task=require('./models/task')

const main=async()=>{
    // const task=await Task.findById('5ec7c120906c1d214e369c39')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
    const user=await User.findById('5ec7bfa5824069202325a430')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks);
    
    
}

main()
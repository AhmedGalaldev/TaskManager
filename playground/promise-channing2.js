require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('5ebc57fc00838b5b4934524d').then(()=>{
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result);
    
// }).catch((e)=>{
//     console.log(e);
    
// })

const findTaskAndRemove=async(id,completed)=>{
    await Task.findByIdAndDelete(id)
    const count =await Task.countDocuments({completed})
    return count
}

findTaskAndRemove('5ebdd2fa2c418015b471d47c',false).then((count)=>{
    console.log(count);
    
}).catch((e)=>{
    console.log(e);
    
})
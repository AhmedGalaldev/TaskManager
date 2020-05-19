require('../src/db/mongoose')
const User=require('../src/models/user')

// User.findByIdAndUpdate('5ebc521e3d047a55e2a48323',{age:1}).then((user)=>{
//     console.log(user);

//     return User.countDocuments({age:1})
    
// }).then((result)=>{
//     console.log(result);
    
// }).catch((e)=>{
//     console.log(e);
    
// })

const findUserAndUpdate=async (id,age)=>{
    await User.findByIdAndUpdate(id,{age})
    const count =await User.countDocuments({age})
    return count
}

findUserAndUpdate('5ebc521e3d047a55e2a48323',3).then((count)=>{
    console.log(count);
    
}).catch((e)=>{
    console.log(e);
    
})

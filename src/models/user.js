const mongoose = require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("the age must be greater than 0")
            }
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is not valide')
            }
        }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:7,
        validate(value){
            
            if(value.toLowerCase().includes('password')){
                throw new Error('password must not include password word')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'

})

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.tokens
    delete userObject.password

    return userObject
}
userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=await jwt.sign({_id:user._id.toString()},"thisismynewcourse")

    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCridentials=async(email,password)=>{
    const user =await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre("save",async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User',userSchema)


module.exports=User
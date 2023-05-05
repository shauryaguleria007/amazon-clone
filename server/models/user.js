const mongoose=require('mongoose');
const bcrypt= require("bcrypt");
const SOLT_WORK_FACTOR=8;
const Schema=mongoose.Schema;


const userSchema= new Schema({
    name:{type:String,min:1,max:50, required:true},
    mobile:{type:Number,min:10, required:true},
    password:{type:String,min:6, required:true}



})


userSchema.pre('save',function(next){
    bcrypt.genSalt(SOLT_WORK_FACTOR,(err,salt)=>{ // genreate salt
                if(err) return next(err);

                bcrypt.hash(this.password,salt,(err,hash)=>{
                    if(err) return next(err);
                    this.password=hash;
                    next();
                })
    })
});

userSchema.methods.hashPassword= function(inputpass){
    return  bcrypt.compare(inputpass,this.password);
 }

module.exports= mongoose.model("user",userSchema);
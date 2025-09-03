const mongoose=require('mongoose') //import  mongoose
const connectionString=process.env.MONGO_URI //load database in the env file into the variabale
mongoose.connect(connectionString).then((res)=>
{
    console.log("mongodb connection successful");
    
})
.catch((err)=>
{
    console.log("mongodb connection failed");
    console.log(err);
    
    
})
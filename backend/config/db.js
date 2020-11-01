import mongoose from 'mongoose';


const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useCreateIndex:true,
        })
        console.log(`DATABASE CONNECTED : ${conn.connection.host}`.yellow.underline)
    }catch (error){
        console.error(`ERROR : ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}


export default connectDB

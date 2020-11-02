import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from "./config/db";
import Order from "./model/UserModel";
import Product from "./model/ProductModel";
import User from './model/userModel.js'


dotenv.config()

connectDB()

const importData = async ()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = product.map((product) =>{
            return{...product,user:adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('DATA IMPORTED!!'.yellow.inverse)
        process.exit()
    } catch (error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('DATA DESTROYED!!'.blue.inverse)
        process.exit()
    }catch (error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


if (process.argv[2]==='-d'){
    destroyData()
}else {
    importData()
}

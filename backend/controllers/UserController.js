import asyncHandler from 'express-async-handler'
import generateToken from "../utils/GenerateToken";
import User from "../model/UserModel";

const authUsername = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(user && (await  user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        })
    }else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})



const registerUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User Already Exist')
    }

    const user = await User.craate({
        email,
        name,
        password
    })

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email :user.email,
            isAdmin: user.isAdmin,
            token :generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})



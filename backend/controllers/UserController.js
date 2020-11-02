import asyncHandler from 'express-async-handler'
import generateToken from "../utils/GenerateToken";
import User from "../model/UserModel";

const authUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})


const registerUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User Already Exist')
    }

    const user = await User.craate({
        email,
        name,
        password
    })

    if (user) {
        res.json(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


const getUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id)

    if (user){
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin:user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



const updateUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id)

    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password){
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name : updateUser.name,
            email : updateUser.email,
            isAdmin : updateUser.email,
            token : generateToken(updateUser._id),
        })
    } else{
        res.status (404)
        throw new Error('User Not Found')
    }
})



const getUsers = asyncHandler (async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler(async (res,req)=>{
    const user = await User.findById(req.params.id)
    if (user){
        await user.remove()
        res.json({
            massage : 'User Removed'
        })
    } else{
        res.status(404)
        throw new Error ('User Not Found')
    }
})


const getUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password')

    if (user){
        res.json(user)
    } else {
        res.status(404)
        throw new Error ('User Not Found')
    }
})



const updateUser = asyncHandler(async (req,res)=>{
    const user = await  User.findById(req.param.id)

    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error ('User Not Found')
    }
})


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}

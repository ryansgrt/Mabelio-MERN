import express from  'express'
import {
    authUser,
    deleteUser, getUserById,
    getUserProfile,
    registerUser, updateUser,
    updateUserProfile
} from "../controllers/UserController";
import {protect} from "../middleware/AuthMiddleware";
const router = express.Router()


router.route('/').post(registerUser).get(protect, admin,getUsers)
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect,admin, updateUser)

export default router

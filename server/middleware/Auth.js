import User from "../models/User.js"
import jwt from 'jsonwebtoken'
// to protect routes
export const protectRoute = async (req, res, next) => {
    try {

        const token = req.headers.token
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodeToken.userId).select('-password')

        if (!user) return res.json({ success: false, message: 'User not found' })
        req.user = user;
        next()
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utlis.js"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'



//sign  a new user

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body
    try {
        if (!fullName || !email || !password || !bio) {
            return res.status(400).json({ success: false, message: 'Missing Details' })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.json({ success: false, message: 'Account already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({ fullName, email, password: hashedPassword, bio })
        const token = generateToken(newUser._id)
        res.status(201).json({ success: true, userData: newUser, token, message: 'Account created successfully' })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}

// to login User
export const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        const userData = await User.findOne({ email })
        console.log(userData, 'use')
        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if (!isPasswordCorrect) return res.json({ success: false, message: 'Incorrect password or email' })
        const token = generateToken(userData._id)
        res.json({ success: true, userData, token, message: 'Login successfull' })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}
// controller to check if  user is authenticated 

//👉 Authentication Actually Checked in a middleware before this controller is called,
{/*
    does req have a attribute named user? = No, req.user is not a built-in property of the req object in Express.
However, you can add custom properties to req — and that’s exactly what middleware like protectRoute does

why can we set res.user = req is incoming request — holds request context like user, params, etc. res is outgoing — meant for building response. 
All auth/user-related logic attaches to req. res is typically for .json(), .status(), etc.
    */}
export const checkAuth = async (req, res) => {
    res.json({ success: true, user: req.user })
}

// controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        console.log(req.body)
        const { fullName, profilePic, bio } = req.body
        const userId = req.user._id
        let updatedUser
        if (!profilePic) {
            updatedUser= await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true })
        }
        else {
            const upload = await cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true })
        }
        res.json({ success: true, user: updatedUser })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}

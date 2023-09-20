//import User Model
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//create token function
const createToken = (_id) => {
	return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'} )
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    //login user 
    try {
        // call upon the custom login static method defied in our User model
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        // return the email and newly loggedin token
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
    //res.json({mssg: 'login user'})
}

// signup user 
const signupUser = async (req,res) => {
    const {email, password} = req.body

    // signup user
    try {
        // calls the custom signup static method defined in the User Model
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)
        
        //return the email and newly created user
        res.status(200).json({email, token})

    } catch (error ) {
        res.status(400).json({error: error.message})
    }
}

// get SINGLE user
const getUser = async (req, res ) => {
    const { email } = req.query

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({error: 'No such user: user does not exist'})
        }

        res.status(200).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { signupUser, loginUser, getUser }

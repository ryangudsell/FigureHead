const mongoose = require('mongoose')
// import bcrypt
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_img: {
        type: String
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    //check to see if there is a value for email & password
    if (!email || !password) {
        throw Error('All fields must be filled in')
    }

    //check if email is valid
    if(!validator.isEmail(email)) {
        throw Error ('Email is not valid')
    }

    //check if password is strong enough
    // By deafult: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }
    //Normal Password: mypassword
    //Add Salt: mypasswordj7h8g4f6r3 (password plus salt)
    //Hash: 64ad45hsad798dhkjs76d45 etc...

    // Generate Salt with 10 characters:
    const salt = await bcrypt.genSalt(10) // 10 extra characters
	// Hash the password and salt combined:
    const hash = await bcrypt.hash(password, salt)

    // set the password to the hash value when creating the user
    const user = await this.create({email, password: hash})

    return user
}
// static login method
userSchema.statics.login = async function (email, password) {
     //check if there is a value for email & password
     if (!email || !password) {
        throw Error('All fields must be filled in')
    }

    // try and find user in db with the email
    const user = await this.findOne({ email })
    // if no user found 
    if(!user) {
        throw Error ('Incorrect email')
    }

    //compare passwords
    const match = await bcrypt.compare(password, user.password)

    // throw error if they don't match
    if(!match) {
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)
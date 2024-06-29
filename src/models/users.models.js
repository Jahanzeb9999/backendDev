import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    userName : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName : {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar : {
        type: String,
        required: true
    },
    coverImage : {
        type : String
    },
    watchHistory : {
        type: Schema.Types.ObjectId,
        ref : "Video"
    },

    password : {
        type: Schema.Types.ObjectId,
        rqeuired: [true, 'Password is required']
    },
    refreshToken : {
        type: String, 
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!isModified(this.password)) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generate access token
userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        _id: this.id,
        email: this.email,
        username: this.userName,
        fullName : this.fullName
    },
    process.env.generateAccessToken,
    {
        expiredIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}


// generateRefreshToken
userSchema.methods.generateRefreshToken = async function() {
    jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

)
}

export const User = mongoose.model("User", userSchema)
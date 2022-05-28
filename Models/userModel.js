const {Schema, model} = require("mongoose");
const jwt = require("jsonwebtoken");
//StringBase
const {stringToBase64} = require("../Helpers/base");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otp: String,
    verified: {
        type: Boolean,
        default: false
    },
    password: String,
    avatar: String,
    dob: Date,
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    provider: String,
    providerId: String,
    clickOnTerms: Number,
    clickOnPrivacy: Number,
    location: {
        city: String,
        postal: String,
        country: String,
        ip: String,
        geometry: {
            lat: String,
            lng: String
        }
    },
    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "user"
    }
}, {timestamps: true});

userSchema.index({createdAt: 1}, {
    expireAfterSeconds: 300,
    partialFilterExpression: {
        verified: false
    }
});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        info: stringToBase64(this.email),
    }, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});
    return token;
};
//Exports
module.exports.User = model('User', userSchema);
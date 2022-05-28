//Packages
const { combineResolvers } = require("graphql-resolvers");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
//Models
const { User } = require("../Models/userModel");
//Helpers
const { sendEmail } = require("../Helpers/email");
//Authorization
const { isAuthenticated } = require("../Authorization/Authorize");

//Validations
const { signupValidation, emailValidations, loginValidations } = require("../Validations/userValidation");

module.exports = {
    Query: {
        getUser: combineResolvers(isAuthenticated, async (_, __, { reqUserInfo }) => {
            const user = await User.findOne({
                email: reqUserInfo.email
            });
            if (!user) throw new Error("User not found!");
            return user;
        })
    },
    Mutation: {
        signUp: async (_, { input }) => {
            const { error } = signupValidation(input);
            if (error) throw new Error(error.details[0].message);
            const user = await User.findOne({
                email: input.email
            });
            if (user) throw new Error("User already exist!");
            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            const mailOptions = {
                email: input.email,
                subject: "One time password",
                code: otp
            }
            sendEmail(mailOptions);
            const newUser = new User({ ...input, otp: otp });
            newUser.otp = await bcrypt.hash(newUser.otp, 12);
            newUser.password = await bcrypt.hash(newUser.password, 12);
            await newUser.save();
            return {
                message: `Verification code sent to ${input.email}!`,
                success: true
            }
        },
        resendCode: async (_, { email }) => {
            const { error } = emailValidations({ email });
            if (error) throw new Error(error.details[0].message);
            const user = await User.findOne({
                email: email
            });
            if (!user) throw new Error("Your request is expired. Please signup again!");
            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            const mailOptions = {
                email: email,
                subject: "One time password",
                code: otp
            }
            sendEmail(mailOptions);
            user.otp = await bcrypt.hash(otp, 12);
            await user.save();
            return {
                message: `Verification code sent to ${email}!`,
                success: true
            }
        },
        verifyAccount: async (_, { email, otp }) => {
            const { error } = emailValidations({ email });
            if (error) throw new Error(error.details[0].message);
            const user = await User.findOne({
                email: email
            });
            if (!user) throw new Error("Account expired, Please signup again!");
            const validOtp = await bcrypt.compare(otp, user.otp);
            if (!validOtp) throw new Error("Verification code is wrong!");
            user.otp = null;
            user.verified = true;
            await user.save();
            const token = user.generateJWT();
            let expire = new Date();
            expire.setDate(expire.getDate() + 30);
            return {
                message: "User created successfully!",
                success: true,
                token,
                expiresIn: expire
            }
        },
        login: async (_, { input }) => {
            const { error } = loginValidations(input);
            if (error) throw new Error(error.details[0].message);
            const user = await User.findOne({
                email: input.email
            });
            if (!user) throw new Error("Email or password is wrong!");
            const validPassword = await bcrypt.compare(input.password, user.password);
            if (!validPassword) throw new Error("Email or password is wrong!");
            const token = user.generateJWT();
            let expire = new Date();
            expire.setDate(expire.getDate() + 30);
            return {
                message: "User created successfully!",
                success: true,
                token,
                expiresIn: expire
            }
        },
        forgetPassword: async (_, { email }) => {
            const { error } = emailValidations({ email });
            if (error) throw new Error(error.details[0].message);
            const user = await User.findOne({
                email: email
            });
            if (!user) throw new Error("User not found under this email!");
            const otp = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            const mailOptions = {
                email: email,
                subject: "One time password",
                code: otp
            }
            sendEmail(mailOptions);
            user.otp = await bcrypt.hash(otp, 12);
            await user.save();
            return {
                message: `Verification code sent to ${email}!`,
                success: true
            }
        },
        resetPassword: async (_, { input }) => {
            const user = await User.findOne({
                email: input.email
            });
            if (!user) throw new Error("User not found under this email!");
            const validOtp = await bcrypt.compare(input.otp, user.otp);
            if (!validOtp) throw new Error("Verification code is wrong!");
            user.otp = null;
            user.password = await bcrypt.hash(input.password, 12);
            await user.save();
            return {
                message: "Password reset successfully",
                success: true
            }
        }
    }
}
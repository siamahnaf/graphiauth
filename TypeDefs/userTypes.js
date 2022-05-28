const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getUser: User
    }
    extend type Mutation {
        signUp(input: signUpInput): successInfo
        resendCode(email: String): successInfo
        verifyAccount(email: String, otp: String): registerSuccess
        login(input: emailInput): registerSuccess
        forgetPassword(email: String): successInfo
        resetPassword(input: resetInput): successInfo
    }
    input signUpInput {
        name: String
        email: String
        password: String
    }
    input emailInput {
        email: String
        password: String
    }
    input resetInput {
        email: String
        password: String
        otp: String
    }
    type successInfo {
        message: String
        success: Boolean
    }
    type registerSuccess {
        message: String
        success: Boolean
        token: String
        expiresIn: Date
    }
    type User {
        name: String
        email: String
        verified: Boolean
        avatar: String
        dob: Date
        gender: String
        provider: String
        clickOnTerms: Int
        clickOnPrivacy: Int
        location: Location
        role: String
    }
    type Location {
        city: String
        postal: String
        country: String
        ip: String
        geometry: Geometry
    }
    type Geometry {
        lat: String,
        lng: String
    }
`;
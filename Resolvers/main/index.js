//Graphql Custom Resolver
const {GraphQLUpload} = require("graphql-upload");
const {GraphQLDateTime} = require("graphql-iso-date");

//All Resolver
const userResolvers = require("../userResolver");

const customResolver = {
    Date: GraphQLDateTime,
    Upload: GraphQLUpload
}

module.exports = [
    customResolver,
    userResolvers
]
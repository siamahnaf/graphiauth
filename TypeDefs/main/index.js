const {gql} = require("apollo-server-express");

//Type Definition
const userTypeDefs = require("../userTypes");

const typeDefs = gql`
    scalar Date
    scalar Upload
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

module.exports = [
    typeDefs,
    userTypeDefs
]
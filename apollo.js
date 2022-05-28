//Packages
const { ApolloServer } = require("apollo-server-express");
const Dataloader = require("dataloader");
//TypeDefs and Resolvers
const typeDefs = require("./TypeDefs/main");
const resolvers = require("./Resolvers/main");
//Midlewares
const { Token } = require("./Authorization/token");

//Initializing Apollo Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        await Token(req);
        return {
            reqUserInfo: req.user
        }
    },
    formatError: error => {
        return {
            message: error.message
        }
    }
});
//Exports
module.exports = apolloServer;
//Packages
require("dotenv/config");
const mongoose = require("mongoose");
const { graphqlUploadExpress } = require("graphql-upload");

//App and Apollo Server
const app = require("./app");
const apolloServer = require("./apollo");

//Start Apollo Server
(async () => {
    app.use(graphqlUploadExpress());
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/press71' });
    app.use("/", (req, res) => {
        res.send("Welcome to Press 71 platform")
    })
})();

//Mongoose Connect
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Failed!"))

//Server Creations
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    console.log(`GraphQl EndPoint path: /press71`);
})

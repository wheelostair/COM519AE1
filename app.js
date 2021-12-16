require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
//const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const app = express();
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running.",
        //chalk.red("✗")
    );
    process.exit();
});

/**
 * Controllers (route handlers).
 */
const resolverController = require("./controllers/resolver");

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
    global.user = false;
    if (req.session.userID && !global.user) {
        const user = await User.findById(req.session.userID);
        global.user = user;
    }
    next();
})

const authMiddleware = async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) {
        return res.redirect('/');
    }
    next()
}

// app.get("/", (req, res) => {
//     res.render("index");
// });

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
})


app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.ejs"));
});

app.get("/resolvers", resolverController.list);

app.get("/incidents", resolverController.list);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
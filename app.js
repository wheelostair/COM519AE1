require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
//const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");

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
const userController = require("./controllers/user");
const num_incidentController = require("./controllers/num_incident");
const incidentController = require("./controllers/incident");
const first_callController = require("./controllers/first_call");
const incidentApiController = require("./controllers/api/incident");

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

app.get("/create-resolver", authMiddleware, (req, res) => {
    res.render("create-resolver", { errors: {} });
});

app.post("/create-resolver", resolverController.create);

app.get("/resolvers", resolverController.list);
app.get("/resolvers/delete/:id", resolverController.delete);
app.get("/resolvers/update/:id", resolverController.edit);
app.post("/resolvers/update/:id", resolverController.update);

app.get("/incidents", incidentController.list);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/join", (req, res) => {
    res.render('create-user', { errors: {} })
});

app.post("/join", userController.create);
app.get("/login", (req, res) => {
    res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
})

app.get("/num_incidents", num_incidentController.list);

app.get("/first_call", first_callController.list);

app.get('/search-incidents', (req, res) => res.render('search-incidents'));
app.get("/api/search-incidents", incidentApiController.list)
app.get("/api/searchincidents", incidentApiController.list);
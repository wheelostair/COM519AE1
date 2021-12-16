const Resolver = require("../models/Resolver")

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const resolvers = await Resolver.find({});
        console.log(resolvers)
        res.render("resolvers", { resolvers: resolvers, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list resolvers" });
    }
};
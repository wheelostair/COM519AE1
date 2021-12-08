const Resolver = require("../models/Resolver")

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const tasters = await Resolver.find({});
        res.render("resolvers", { resolvers: resolvers, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list resolvers" });
    }
};
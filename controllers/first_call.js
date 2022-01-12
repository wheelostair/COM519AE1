const First_call = require("../models/First_call");
const Resolver = require("../models/Resolver")

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const first_calls = await First_call.find({});
        console.log(first_calls)
        res.render("first_call", { first_calls: first_calls, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list first point of contact resolutions" });
    }
};
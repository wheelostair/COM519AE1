const Num_incident = require("../models/Num_incident");
const Resolver = require("../models/Resolver")

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const num_incidents = await Num_incident.find({});
        console.log(num_incidents)
        res.render("num_incidents", { num_incidents: num_incidents, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list num_incidents" });
    }
};
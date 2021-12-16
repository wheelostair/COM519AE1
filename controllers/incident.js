const Incident = require("../models/Incident");
const Resolver = require("../models/Incident")

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const incidents = await Incident.find({});
        console.log(incidents)
        res.render("incidents", { incidents: incidents, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list incidents" });
    }
};
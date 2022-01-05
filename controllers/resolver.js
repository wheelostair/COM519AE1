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

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {

        await Resolver.findByIdAndRemove(id);
        res.redirect("/resolvers");
    } catch (e) {
        res.status(404).send({
            message: `could not delete  record ${id}.`,
        });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const resolver = await Resolver.findById(id);
        res.render('update-resolver', { resolvers: resolvers, id: id });
    } catch (e) {
        res.status(404).send({
            message: `could find resolver ${id}.`,
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const resolver = await Resolver.updateOne({ _id: id }, req.body);
        res.redirect('/resolvers/?message=taster has been updated');
    } catch (e) {
        res.status(404).send({
            message: `could find resolver ${id}.`,
        });
    }
};

exports.create = async (req, res) => {

    try {
        const resolver = new Resolver({ name: req.body.name});
        await resolver.save();
        res.redirect('/resolvers/?message=resolver has been created')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-resolver', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}
const mongoose = require("mongoose");
const { Schema } = mongoose;

const resolverSchema = new Schema(
    {
        Name: { type: String }
    },
    {
        versionKey: false // You should be aware of the outcome after set to false
    }

)
module.exports = mongoose.model("Resolver", resolverSchema);
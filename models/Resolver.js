const mongoose = require("mongoose");
const { Schema } = mongoose;

const resolverSchema = new Schema(
    {
        name: { type: String }
    },
    {
        versionKey: false 
    }

)
module.exports = mongoose.model("Resolver", resolverSchema);
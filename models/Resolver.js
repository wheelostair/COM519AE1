const mongoose = require("mongoose");
const { Schema } = mongoose;

const resolverSchema = new Schema(
    {
    resolvedBy: { type: String, required: [true, 'Name is required']}
}

)
module.exports = mongoose.model("Resolver", resolverSchema);
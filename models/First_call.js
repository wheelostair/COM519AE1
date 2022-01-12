const mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");
const { Schema } = mongoose;

const first_callSchema = new Schema(
  {
    id_: {
      type: String
    },

    name: { type: String },

    first_call: { type: Number }
  }

);

// num_incidentSchema.index({ '$**': 'text' });

module.exports = mongoose.model("First_call", first_callSchema);



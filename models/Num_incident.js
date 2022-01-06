const mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");
const { Schema } = mongoose;

const num_incidentSchema = new Schema(
  {
    id_: {
      type: String
    },
    
    name: { type: String},

    num_incidents: { type: Number}
  }
  
);

// num_incidentSchema.index({ '$**': 'text' });

module.exports = mongoose.model("Num_incident", num_incidentSchema);



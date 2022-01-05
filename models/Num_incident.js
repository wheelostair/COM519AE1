const mongoose = require("mongoose");
const { Schema } = mongoose;

const num_incidentSchema = new Schema(
  {
    id_: {
      type: String
    },
    
    Name: { type: String, required: [true, 'Name is required'] },

    num_incidents: { type: Number}
  }
  
);

// num_incidentSchema.index({ '$**': 'text' });

module.exports = mongoose.model("Num_incident", num_incidentSchema);



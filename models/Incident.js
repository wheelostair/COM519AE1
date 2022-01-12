const mongoose = require("mongoose");
const { Schema } = mongoose;

const incidentSchema = new Schema(
    {
        
        CreatedDate: { type: String },
        FirstCallResolution: { type: Boolean },
        IncidentNumber: { type: Number },
        Name: { type: String },
        ResolvedDate: { type: String },
        Subject: { type: String },
    }

);

incidentSchema.index({ '$**': 'text' });
module.exports = mongoose.model("Incident", incidentSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;

const incidentSchema = new Schema(
    {
        
        CreatedDate: { type: String },
        FirstCallResolution: { type: Boolean },
        IncidentNumber: { type: Number },
        ResolvedBy: { type: String },
        ResolvedDate: { type: String },
        Subject: { type: String },
    }

)
module.exports = mongoose.model("Incident", incidentSchema);
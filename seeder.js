const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
// const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


// const client = new MongoClient(MONGODB_URI);

const uri = "mongodb://127.0.0.1:27017/incident"
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db();
        const results = await db.collection("resolvers").find({}).count();

        if (results) {
            db.dropDatabase();
        }

        // const load = loading("Importing Incidents").start();

        const data = await fs.readFile(path.join(__dirname, "incident.json"), "utf8");
        await db.collection("incidents").insertMany(JSON.parse(data));

        await db.collection("incidents").updateMany({}, { $rename: { "ResolvedBy": "Name" } });

        await db.collection("incidents").aggregate([{ $group: { _id: "$Name" } },
        { $project: { name: "$_id", "_id": 0 } },
        { $out: "resolvers" }
        ]).toArray();

        await db.collection("resolvers").updateMany({ name: "" }, { $set: { name: "No Resolver" } });

        await db.collection("incidents").aggregate([{ $group: { _id: "$Name", name: { "$first": "$Name" }, num_incidents: { $sum: 1 } } }, { $sort: { num_incidents: -1 } },
        { $out: "num_incidents" }
        ]).toArray();

        await db.collection("num_incidents").updateMany({ name: "" }, { $set: { name: "No Resolver" } });

        db.collection("incidents").aggregate([{ $match: { FirstCallResolution: true } },
        { $group: { _id: "$Name", name: { "$first": "$Name" }, first_call: { $sum: 1 } } }, { $sort: { first_call: -1 } },
        { $out: "first_calls" }
        ]).toArray();

        await db.collection("first_calls").updateMany({ name: "" }, { $set: { name: "No Resolver" } });

        // load.stop();
        console.info("incidents set up");

        process.exit();
    }
    catch (error) {
        console.error("error", error);
        process.exit();
    }
}

main();
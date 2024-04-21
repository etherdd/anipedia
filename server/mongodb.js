const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require("./config.json");

// Followed examples in https://www.mongodb.com/languages/mern-stack-tutorial

module.exports = async () => {
  try {
    const client = new MongoClient(config.mongodb, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    let db = client.db("anipedia")
    await db.command({ ping: 1 });
    console.log("Successfully connected to mongodb anipedia db");
    return db;
  } catch (err) {
    console.error(err);
  }
}

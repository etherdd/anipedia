
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./config.json')

const client = new MongoClient(config.mongodb, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Followed examples in https://www.mongodb.com/languages/mern-stack-tutorial

try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("anipedia").command({ ping: 1 });
    console.log("Successfully connected to mongodb anipedia db");
} catch(err) {
    console.error(err);
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}

let mongodb = client.db("anipedia");

export default mongodb;

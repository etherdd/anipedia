import mongodb from "mongodb.js"

const comments = async function(req, res) {
  let queryString = "";
  let comments = await mongodb.collection("comments");
  let users = await mongodb.collection("users");
  let results = await collection.find({}).toArray();
  res.json(results);
}

module.exports = {
  comments
}

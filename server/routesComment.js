const mongodb = require("./mongodb");

// Save a comment
const postComment = async function (req, res) {
  try {
    const movieId = req.params.movie_id;
    console.log(`Posting comment for ${movieId}`);
    const body = req.body;
    console.log(`Request body ${JSON.stringify(body)}`);
    const db = await mongodb();
    const collection = db.collection("comments");
    const result = await collection.insertOne({
      movie_id: movieId,
      comment: body.comment,
      user_id: body.user_id,
      created_at: new Date(),
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

// Return the most 50 comments of a movie
const getComment = async function (req, res) {
  try {
    const movieId = req.params.movie_id;
    console.log(`Getting comments for ${movieId}`);
    const db = await mongodb();
    const collection = db.collection("comments");
    const result = await collection
      .find({
        movie_id: movieId,
      })
      .sort({ created_at: -1 })
      .limit(50)
      .toArray();

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

module.exports = {
  postComment,
  getComment,
};

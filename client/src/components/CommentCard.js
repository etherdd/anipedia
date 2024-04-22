import { useEffect, useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
// Format date
import moment from "moment";

import "./CommentCard.css";
const config = require("../config.json");

export default function Poster({ movieId }) {
  const { user, isAuthenticated, isLoading } =
    useAuth0();

  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState("");
  const [shouldReload, setShouldReload] = useState(true);

  useEffect(() => {
    if (!shouldReload) return;
    fetch(
      `http://${config.server_host}:${config.server_port}/movie/${movieId}/comment`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setComments(resJson);
        setShouldReload(false);
      });
  }, [movieId, shouldReload]);

  const handleButtonClick = async () => {
    if (myComment !== undefined && myComment !== "") {
      fetch(
        `http://${config.server_host}:${config.server_port}/movie/${movieId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: myComment,
            user_id: user.sub,
          }),
        }
      ).then(() => {
        setMyComment("");
        setShouldReload(true);
      });
    }
  };

  return (
    <div className="comment-div">
      {!isLoading &&
        (isAuthenticated ? (
          <div className="comment-input">
            <TextField
              label="Enter your comment"
              size="small"
              onChange={(e) => setMyComment(e.target.value)}
              value={myComment}
              multiline
            />
            <Button
              variant="contained"
              size="small"
              className="comment-button"
              onClick={handleButtonClick}
            >
              Submit
            </Button>
          </div>
        ) : (
          <p>Log in to post your comment</p>
        ))}

      <h3>Recent Comments</h3>
      {comments.map((comment) => (
        <Card variant="outlined" key={comment._id} className={"comment-card"}>
          <div className="comment-content">{comment.comment}</div>
          <div className="comment-date">
            {moment(comment.created_at).fromNow()}
          </div>
        </Card>
      ))}
    </div>
  );
}

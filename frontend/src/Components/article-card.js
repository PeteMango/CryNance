import { useState } from "react";
import "./Components.css";

const ArticleCard = ({
  id,
  title,
  author,
  date,
  body,
  votes,
  level,
  Downvote,
  Upvote,
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Read");

  const handleUpvote = (articleID) => {
    if (!upvoted) {
      setUpvoted(true);
      setDownvoted(false);
      Upvote(articleID);
    }
  };

  const handleDownvote = (articleID) => {
    if (!downvoted) {
      setDownvoted(true);
      setUpvoted(false);
      Downvote(articleID);
    }
  };

  const toggleVisibility = () => {
    if (level === "free") {
      setVisible(!visible);
      setButtonText(visible ? "Read" : "Close");
    } else if (level === "premium" || level === "all knower") {
      if (!visible) {
        setModalOpen(true);
      }  else {
        setButtonText("Read");
        setVisible(false)
      }


    }
  };

  const toggleVisible = () => {
    setVisible(true);
    setModalOpen(false);
    setButtonText("Close")
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 margin-sm">
        <div className="cardContainer">
          <h1 className="cardHeader">{title}</h1>
          <h3 className="cardDate">
            {date}, published by {author} ====== {level}
          </h3>
          <h4 className={`cardBody ${visible ? "" : "cardBody2"}`}>{body}</h4>
          <button
            className={`cardButton ${upvoted ? "upvoted" : ""}`}
            onClick={() => handleUpvote(id)}
            disabled={upvoted}
          >
            ⇑
          </button>
          <button
            className={`cardButton ${downvoted ? "downvoted" : ""}`}
            onClick={() => handleDownvote(id)}
            disabled={downvoted}
          >
            ⇓
          </button>
          <button className="btn btn-sm" onClick={toggleVisibility}>
            {buttonText}
          </button>
          {modalOpen && (
            <dialog className="modal" open>
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Make a Purchase</h3>
                <p className="py-4">
                  To access this {level} content, make a one-time payment of{" "}
                  {level === "premium" ? "2 WDC" : "5 WDC"}.
                </p>
                <h4>
                  <b>Author: </b>
                  {author}
                </h4>
                <h4>
                  <b>Publishing Date: </b>
                  {date}
                </h4>
                <h4>
                  <b>Title: </b>
                  {title}
                </h4>
                <button
                  className="btn btn-sm"
                  style={{ marginTop: "10px" }}
                  onClick={toggleVisible}
                >
                  Pay Now
                </button>
              </form>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleCard

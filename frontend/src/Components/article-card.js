import { useState } from 'react';
import './Components.css';

const ArticleCard = ({ id, title, author, date, body, votes, level, Downvote, Upvote }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

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

  return (
    <>
      <div className="card">
        <div className="cardContainer">
          <h1 className="cardHeader">{title}</h1>
          <h3 className="cardDate">
            {date}, published by {author}
          </h3>
          <h4 className="cardBody">{body}</h4>
          <button
            className={`cardButton ${upvoted ? 'upvoted' : ''}`}
            onClick={() => handleUpvote(id)}
            disabled={upvoted}
          >
            <a target="_blank" rel="noopener noreferrer">Upvote</a>
          </button>
          <button
            className={`cardButton ${downvoted ? 'downvoted' : ''}`}
            onClick={() => handleDownvote(id)}
            disabled={downvoted}
          >
            <a target="_blank" rel="noopener noreferrer">Downvote</a>
          </button>
          <p className="voteCount">{votes} upvotes</p>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;

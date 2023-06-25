import { useState } from 'react';
import './Components.css';

const ArticleCard = ({ id, title, author, date, body, votes, level, Downvote, Upvote }) => {
	const [upvoted, setUpvoted] = useState(false);
	const [downvoted, setDownvoted] = useState(false);

	// const Upvote = async (articleID) => {
    //     fetch("http://localhost:4000/api/upvote-by-id", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({id: articleID})
    //     })
    //     .then((response) => {
    //         if (response.status === 200) console.log("Success");
    //         else console.log("Error");
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //         fetchArticles();
    //     })
    //     .catch((error) => {console.log(error)})
    // }

    // const Downvote = async (articleID) => {
    //     fetch("http://localhost:4000/api/downvote-by-id", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({id: articleID})
    //     })
    //     .then((response) => {
    //         if (response.status === 200) console.log("Success");
    //         else console.log("Error");
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //         fetchArticles();
    //     })
    //     .catch((error) => {console.log(error)})
    // }
  
	const handleUpvote = (articleID) => {
	  setUpvoted(true);
	  setDownvoted(false);
	  Upvote(articleID);
	};
  
	const handleDownvote = (articleID) => {
	  setDownvoted(true);
	  setUpvoted(false);
	  Downvote(articleID);
	};
  
	return (
	  <>
		<div className="card">
		  {/* <div className="cardImage"><img src='/images/pink.png'></img></div> */}
		  <div className="cardContainer">
			<h1 className="cardHeader">{title}</h1>
			<h3 className="cardDate">
			  {date}, published by {author}
			</h3>
			<h4 className="cardBody">{body}</h4>
			<button
			  className={`cardButton ${upvoted ? 'upvoted' : ''}`}
			  onClick={() => handleUpvote(id)}
			>
			  <a target="_blank">Upvote</a>
			</button>
			<button
			  className={`cardButton ${downvoted ? 'downvoted' : ''}`}
			  onClick={() => handleDownvote(id)}
			>
			  <a target="_blank">Downvote</a>
			</button>
			<p className="voteCount">{votes} upvotes</p>
		  </div>
		</div>
	  </>
	);
  };
  

export default ArticleCard;

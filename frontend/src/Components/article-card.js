import './Components.css'

const ArticleCard = ({ title, author, date, body, votes, level }) => {
	return (
		<>
			<div className="card">
				{/* <div className="cardImage"><img src='/images/pink.png'></img></div> */}
				<div className="cardContainer">
					<h1 className="cardHeader">{title}</h1>
                    <h3 className='cardDate'>{date}, published by {author}</h3>
					<h4 className="cardBody">{body}</h4>
					<button className="cardButton"><a target="_blank">Upvote</a></button>
					<button className="cardButton"><a target="_blank">Downvote</a></button>
				</div>
			</div>
		</>
	)
}

export default ArticleCard
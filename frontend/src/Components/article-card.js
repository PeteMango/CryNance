import './Components.css'

const Card = ({ header, body, imgLink, date, github, devpost }) => {
	return (
		<>
			<div className="card">
				<div className="cardImage"><img src='/images/pink.png'></img></div>
				<div className="cardContainer">
					<h1 className="cardHeader">Card Header</h1>
                    <h3 className='cardDate'>Date</h3>
					<h4 className="cardBody">Chatify was a project developed for a Hackathon (Hack This Fall 2.0). Chatify users discuss global issues through socially tough times (e.g. Covid-19 pandemic). Join numerous rooms with different topics, or start their own room with a new topic. Built with React, Bootstrap, and Firebase.</h4>
					<button className="cardButton"><a target="_blank">Upvote</a></button>
					<button className="cardButton"><a target="_blank">Downvote</a></button>
				</div>
			</div>
		</>
	)
}

export default Card
import './Pages.css';
import ArticleCard from '../Components/article-card';
import DashboardCard from '../Components/dashboard-card'
import {useEffect, useState} from 'react';

export default function Browse() {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        fetchArticles();
    }, [])

    const fetchArticles = async () => {
        fetch("http://localhost:4000/api/get-all-articles", {
            method: "GET",
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Success");
            }
            else {
                console.log("Error");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setArticles(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(articles);
    }, [articles])

    const handleUpvote = async (articleID) => {
        fetch("http://localhost:4000/api/upvote-by-id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: articleID,
            })
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Success");
            }
            else {
                console.log("Error");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            fetchArticles();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDownvote = async (articleID) => {
        fetch("http://localhost:4000/api/downvote-by-id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: articleID,
            })
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Success");
            }
            else {
                console.log("Error");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            fetchArticles();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="grid grid-cols-2 p-8 m-8">
                {articles && articles.sort((a, b) => b.vote - a.vote)
                    .map((article) => {
                    return (
                        <div key={article.id} className="border-2 border-black">
                            <p>Created by: {article.author_id}</p>
                            <p>Title: {article.title}</p>
                            <p>Content: {article.content}</p>
                            <p>Created at: {article.created_at}</p>
                            <p>Level: {article.level}</p>
                            <p>Vote: {article.vote}</p>
                            <button onClick={() => {handleUpvote(article.id)}}>Upvote</button>
                            <button onClick={() => {handleDownvote(article.id)}}>Downvote</button>
                        </div>
                    )
                })}
            </div>
            {/* <div class="center-content">
                <div className="card">
                    <div className="cardImage"><img src='/images/pink.png'></img></div>
                    <div className="cardContainer">
                        <h1 className="cardHeader">Card Header </h1>
                        <h4 className="cardBody">Card Body</h4>
                        <h3 className='cardDate'>Date</h3>
                    </div>
                </div>  
            </div> */}
            
            <div class="center-content">
                <div class="join">
                    <div>
                        <div>
                        <input class="input input-bordered join-item" placeholder="Search..."/>
                        </div>
                    </div>
                    <select class="select select-bordered join-item">
                        <option disabled selected>Sort By</option>
                        <option>Recent</option>
                        <option>Rating</option>
                    </select>
                    <div class="indicator">
                        <button class="btn join-item">Search</button>
                    </div>
                </div>
                <ArticleCard></ArticleCard>
                <DashboardCard></DashboardCard>
            </div>
            {/* <Card></Card> */}
        </>
    )
}
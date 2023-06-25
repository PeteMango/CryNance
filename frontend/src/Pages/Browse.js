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
        fetch("http://localhost:4000/api/get-all-articles", {method: "GET"})
        .then((response) => {
            if (response.status === 200) console.log("Success");
            else console.log("Error");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setArticles(data);
        })
        .catch((error) => {console.log(error);})
    }

    useEffect(() => {console.log(articles);}, [articles])

    const handleUpvote = async (articleID) => {
        fetch("http://localhost:4000/api/upvote-by-id", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: articleID})
        })
        .then((response) => {
            if (response.status === 200) console.log("Success");
            else console.log("Error");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            fetchArticles();
        })
        .catch((error) => {console.log(error)})
    }

    const handleDownvote = async (articleID) => {
        fetch("http://localhost:4000/api/downvote-by-id", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: articleID})
        })
        .then((response) => {
            if (response.status === 200) console.log("Success");
            else console.log("Error");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            fetchArticles();
        })
        .catch((error) => {console.log(error)})
    }

    return (
        <>  
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
                {articles && articles.sort((a,b) => b.vote - a.vote)
                    .map((article) => {
                        return (
                            <ArticleCard
                                key={article.id}
                                id={article.id}
                                title={article.title}
                                author={article.author_id}
                                date={article.created_at}
                                body={article.content}
                                votes={article.vote}
                                level={article.level}
                                Upvote={handleUpvote}
                                Downvote={handleDownvote}
                            />
                        )
                    })
                }
                
            </div>
            {/* <Card></Card> */}
        </>
    )
}
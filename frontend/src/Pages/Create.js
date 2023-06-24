import React, { useEffect, useRef, useState } from 'react';

// app.post("/api/add-article", async (req, res) => {
//     // id author_id created_at content title level vote
//     const {author_id, content, title, level, isDraft, categories} = req.body;

export default function Create() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [articleContent, setArticleContent] = useState('');
    const [title, setTitle] = useState('');
    const level = useRef('');
    const user = localStorage.getItem('user');
    useEffect(() => {
        console.log("user", user);
    }, [user]);
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [publishedArticles, setPublishedArticles] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/get-articles-by-authorID/${localStorage.getItem('user')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Articles retrieved")
            }
            else {
                console.log("Error retrieving articles")
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setPublishedArticles(data);
        })
        .catch((error) => {
            console.log(error);
        })

    }, [])

    const handleNewArticleClick = () => {
        setPopupOpen(true);
    };

    const handleCancelClick = () => {
        setPopupOpen(false);
        setArticleContent('');
    };

    const handleSaveAsDraftClick = async (event) => {
        event.preventDefault();
        fetch("http://localhost:4000/api/add-article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_id: user,
                content: articleContent,
                title: title,
                level: level.current.value,
                isDraft: true,
                categories: categories 
            })
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Article saved as draft")
            }
            else {
                console.log("Error saving article as draft")
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
        // Logic to save article as draft

        setPopupOpen(false);
        setArticleContent('');
    };

    const handlePublishClick = async (event) => {
        // Logic to publish article
        event.preventDefault();
        fetch("http://localhost:4000/api/add-article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_id: user,
                content: articleContent,
                title: title,
                level: level.current.value,
                isDraft: false,
                categories: categories 
            })
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Article saved")
            }
            else {
                console.log("Error saving article")
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
        setPopupOpen(false);
        setArticleContent('');
    };

    const addCategory = (e) => {
        e.preventDefault();
        const newCategory = query;
        setCategories([...categories, newCategory]);
    }

    useEffect(() => {
        console.log(categories);
    }, [categories])

    useEffect(() => {
        console.log(publishedArticles);
    }, [publishedArticles])

    return (
        <div>
            <h1>Create Page</h1>

            <div className="container">
                <div className="articles-container">
                    <h2>Published Articles</h2>
                    {/* Render published articles here */}
                    {
                        publishedArticles && publishedArticles.map((article) => (
                            article.isDraft == false && (
                                <div key={article.id}>
                                    {article.author_id}
                                    {article.title}
                                    {article.content}
                                    {article.votes}
                                </div>
                            )

                        ))
                    }
                </div>

                <div className="articles-container">
                    <h2>Articles in Draft</h2>
                    {/* Render articles in draft here */}
                    {
                        publishedArticles && publishedArticles.map((article) => (
                            article.isDraft == true && (
                                <div key={article.id}>
                                    {article.author_id}
                                    {article.title}
                                    {article.content}
                                    {article.votes}
                                </div>
                            )

                        ))
                    }
                </div>
            </div>

            <button onClick={handleNewArticleClick}>New Article</button>

            {isPopupOpen && (
                <form>
                    <h2>New Article</h2>
                    <label>
                        ARTICLE TITLE: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        ADD TEXT:
                        <textarea
                            value={articleContent}
                            onChange={(e) => setArticleContent(e.target.value)}/>
                    </label>
                    <br />
                    <select ref={level}  >
                        <option value="">Select Tier of Article</option>
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                        <option value="all knower">All Knower</option>
                    </select>
                    <br />
                    <label>
                        ADD CATEGORIES:
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <button onClick={addCategory} className="btn">Add Category</button>
                    </label>
                    <br />
                    <button onClick={handleCancelClick} className="btn">Cancel</button>
                    <button type="submit" onClick={handleSaveAsDraftClick} className="btn">Save as Draft</button>
                    <button type="submit" onClick={handlePublishClick} className="btn">Publish</button>
                </form>
            )}
        </div>
    );
}

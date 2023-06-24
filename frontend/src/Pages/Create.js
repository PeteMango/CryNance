import React, { useEffect, useRef, useState } from 'react';

// app.post("/api/add-article", async (req, res) => {
//     // id author_id created_at content title level vote
//     const {author_id, content, title, level, isDraft, categories} = req.body;

export default function Create() {
    const [isPopupOpen, setPopupOpen] = useState(true);
    const [articleContent, setArticleContent] = useState('');
    const [title, setTitle] = useState('');
    const level = useRef('');
    const user = localStorage.getItem('user');
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([]);

    // const handleNewArticleClick = () => {
    //     setPopupOpen(true);
    // };

    // const handleCancelClick = () => {
    //     setPopupOpen(false);
    //     setArticleContent('');
    // };

    // const handleSaveAsDraftClick = () => {
    //     // Logic to save article as draft
    //     setPopupOpen(false);
    //     setArticleContent('');
    // };

    // const handlePublishClick = () => {
    //     // Logic to publish article
    //     setPopupOpen(false);
    //     setArticleContent('');
    // };

    const addCategory = (e) => {
        e.preventDefault();
        const newCategory = query;
        setCategories([...categories, newCategory]);
    }

    useEffect(() => {
        console.log(categories);
    }, [categories])
    useEffect(() => {
        console.log(query);
    }, [query])

    return (
        <div>
            <h1>Create Page</h1>

            <div className="container">
                <div className="articles-container">
                    <h2>Published Articles</h2>
                    {/* Render published articles here */}
                </div>

                <div className="articles-container">
                    <h2>Articles in Draft</h2>
                    {/* Render articles in draft here */}
                </div>
            </div>

            {/* <button onClick={handleNewArticleClick}>New Article</button> */}

            {isPopupOpen && (
                <form>
                    <h2>New Article</h2>
                    {/* <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        
                    ></textarea>
                    <select ref={level}  >
                        <option value="">Select Tier of Article</option>
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                        <option value="All Knower">All Knower</option>
                    </select> */}
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button onSubmit={addCategory}>Add Category</button>
                    {/* <button onClick={handleCancelClick}>Cancel</button>
                    <button type="submit" onClick={handleSaveAsDraftClick}>Save as Draft</button>
                    <button type="submit" onClick={handlePublishClick}>Publish</button> */}
                </form>
            )}
        </div>
    );
}

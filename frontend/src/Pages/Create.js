import React, { useState } from 'react';


export default function Create() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [articleContent, setArticleContent] = useState('');

    const handleNewArticleClick = () => {
        setPopupOpen(true);
    };

    const handleCancelClick = () => {
        setPopupOpen(false);
        setArticleContent('');
    };

    const handleSaveAsDraftClick = () => {
        // Logic to save article as draft
        setPopupOpen(false);
        setArticleContent('');
    };

    const handlePublishClick = () => {
        // Logic to publish article
        setPopupOpen(false);
        setArticleContent('');
    };

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

            <button onClick={handleNewArticleClick}>New Article</button>

            {isPopupOpen && (
                <div>
                    <h2>New Article</h2>
                    <textarea
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                    ></textarea>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button onClick={handleSaveAsDraftClick}>Save as Draft</button>
                    <button onClick={handlePublishClick}>Publish</button>
                </div>
            )}
        </div>
    );
}

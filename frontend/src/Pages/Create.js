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
      categories: categories,
      votes: 0, // Set the votes property to 0
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Article saved as draft");
        return response.json();
      } else {
        console.log("Error saving article as draft");
        throw new Error("Error saving article as draft");
      }
    })
    .then((data) => {
      console.log(data);
      setPublishedArticles((prevState) => [...prevState, data]);
    })
    .catch((error) => {
      console.log(error);
    });

  setPopupOpen(false);
  setArticleContent('');
};

    const handlePublishClick = async (event) => {
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
            categories: categories,
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("Article saved");
              return response.json(); // Parse the response JSON
            } else {
              console.log("Error saving article");
              throw new Error("Error saving article"); // Throw an error for error handling
            }
          })
          .then((data) => {
            console.log(data);
            // Update the publishedArticles state with the new article
            setPublishedArticles((prevState) => [...prevState, data]);
          })
          .catch((error) => {
            console.log(error);
          });
      
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
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Create Page</h1>
      
          <div className="grid grid-cols-2 gap-4">
          <div>
  <h2 className="text-lg font-semibold mb-2">Published Articles</h2>
  <div className="bg-white rounded-lg shadow-md p-4">
    {/* Render published articles here */}
    {publishedArticles &&
      publishedArticles.map((article) => (
        article.isDraft === 0 && ( // Updated condition
          <div key={article.id}>
            <p className="text-gray-600 font-semibold">{article.author_id}</p>
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p>{article.content}</p>
            <p>{article.votes}</p>
          </div>
        )
      ))}
  </div>
</div>

<div>
  <h2 className="text-lg font-semibold mb-2">Articles in Draft</h2>
  <div className="bg-white rounded-lg shadow-md p-4">
    {/* Render articles in draft here */}
    {publishedArticles &&
      publishedArticles.map((article) => (
        article.isDraft === 1 && ( // Updated condition
          <div key={article.id}>
            <p className="text-gray-600 font-semibold">{article.author_id}</p>
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p>{article.content}</p>
            <p>{article.votes}</p>
          </div>
        )
      ))}
  </div>
</div>

          </div>
      
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleNewArticleClick}
          >
            New Article
          </button>
      
          {isPopupOpen && (
            <form className="mt-4 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4">New Article</h2>
              <label className="block mb-2">
                ARTICLE TITLE:
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-2 py-1 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <br />
              <label className="block mb-2">
                ADD TEXT:
                <textarea
                  className="border border-gray-300 rounded-md px-2 py-1 w-full"
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                />
              </label>
              <br />
              <select
                ref={level}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
              >
                <option value="">Select Tier of Article</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="all knower">All Knower</option>
              </select>
              <br />
              <label className="block mb-2">
                ADD CATEGORIES:
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-2 py-1 w-full"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={addCategory}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded ml-2"
                >
                  Add Category
                </button>
              </label>
              <br />
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSaveAsDraftClick}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                onClick={handlePublishClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Publish
              </button>
            </form>
          )}
        </div>
      );
      
}

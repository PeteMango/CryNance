import React, { useEffect, useRef, useState } from "react";

export default function Create() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [articleContent, setArticleContent] = useState("");
  const [title, setTitle] = useState("");
  const level = useRef("");
  const user = localStorage.getItem("username") || localStorage.getItem("user") || "Anonymous";
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [publishedArticles, setPublishedArticles] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/get-articles-by-authorID/${localStorage.getItem(
        "user"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Articles retrieved");
        } else {
          console.log("Error retrieving articles");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPublishedArticles(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNewArticleClick = () => {
    setPopupOpen(true);
  };

  const handleCancelClick = () => {
    setPopupOpen(false);
    setArticleContent("");
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
        votes: 0,
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
        setPopupOpen(false);
        setArticleContent("");

        // Reload the page to display the updated "Articles in Draft"
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
          return response.json();
        } else {
          console.log("Error saving article");
          throw new Error("Error saving article");
        }
      })
      .then((data) => {
        console.log(data);
        setPublishedArticles((prevState) => [...prevState, data]);
        setPopupOpen(false);
        setArticleContent("");

        // Reload the page to display the updated "Published Articles"
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const newCategory = query;
    setCategories([...categories, newCategory]);
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    console.log(publishedArticles);
  }, [publishedArticles]);

  const handleDelete = (id) => {
    fetch("http://localhost:4000/api/article-delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      })
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Article deleted");
        return response.json();
      } else {
        console.log("Error deleting article");
        throw new Error("Error deleting article");
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create An Article!</h1>

      <div
        className="center-content"
        style={{ backgroundColor: "transparent" }}
      >
        <div>
          <h2 className="text-lg font-semibold mb-2">Articles</h2>

          {/* Render published and draft articles here */}
          {publishedArticles &&
            publishedArticles.map((article) => (
              <div className="bg-white rounded-lg shadow-md p-4 margin-sm">
                <div key={article.id}>
                  <p className="text-gray-600 font-semibold">
                    {article.author_id}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p>{article.content}</p>
                  <p>{article.votes}</p>
                  {article.isDraft ? (
                    <p className="text-blue-500 font-semibold">Draft</p>
                  ) : (
                    <p className="text-green-500 font-semibold">Published</p>
                  )}
                  <button class="btn btn-circle btn-outline" onClick={() => handleDelete(article.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleNewArticleClick}
        >
          New Article
        </button>
      </div>

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

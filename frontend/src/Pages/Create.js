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

  const calculateSuperuser = () => {
    if (publishedArticles) {
      let totalVotes = 0;
      publishedArticles.forEach((article) => {
        totalVotes += article.vote;
        console.log("totalvotes: ", totalVotes);
      });
      const averageVotes = totalVotes / publishedArticles.length;
      const authentication = localStorage.getItem("authentication");
      let value = averageVotes - 40;
      console.log("value: ", value);
      if (authentication === "orb") {
        value = 2 * value;
      }
      else if (authentication === "phone") {
        value = 1.5 * value;
      }
      else {
        value = 1 * value;
      }
      if (value > 0) {
        localStorage.setItem("superuser", "true");
        return true;
      }
      localStorage.setItem("superuser", "false");
      return false;
    }
    localStorage.setItem("superuser", "false");
    return false;
  }
  useEffect(() => {
    calculateSuperuser();
  }, [publishedArticles])

  // useEffect(() => {
  const fetchArticles = async () => {
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
  }

  useEffect(() => {
    fetchArticles();
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
      fetchArticles();
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

      <div
        className="center-content"
        style={{ backgroundColor: "transparent" }}
      >
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{color:"#313131"}}>My Articles</h2>

          {/* Render published and draft articles here */}
          {publishedArticles &&
            publishedArticles
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((article) => (
              <div className="bg-white rounded-lg shadow-md p-4 margin-sm">
                <div key={article.id}>
                  <h3 className="text-xl font-bold mb-2" style={{color:"#313131"}}>{article.title}</h3>
                  {article.isDraft ? (
                    <p className="text-blue-500 font-semibold" style={{margin:'10px 0'}}>Draft</p>
                  ) : (
                    <p className="text-green-500 font-semibold" style={{margin:'10px 0'}}>Published</p>
                  )}
                  <p style={{color:"#313131"}}>{article.content}</p>
                  <p>{article.votes}</p>

                  <button class="btn btn-md" style={{marginTop:'10px'}} onClick={() => handleDelete(article.id)}>Delete Article
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
        {isPopupOpen && (
        <form className="mt-4 bg-white rounded-lg shadow-md p-4 margin-sm">
          <h2 className="text-md font-bold mb-4">Title
            <input type="text" className="border border-gray-300 rounded-md px-2 py-1 w-full body-font" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </h2>
          <h2 className="text-md font-bold mb-4">Article Body
            <textarea className="border border-gray-300 rounded-md px-2 py-1 w-full body-font" value={articleContent} onChange={(e) => setArticleContent(e.target.value)}/>
          </h2>
          <select ref={level} className="border border-gray-300 rounded-md px-2 py-1 w-full">
            <option value="">Select Tier of Article</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="all knower">All Knower</option>
          </select>
          <br/>
          <br/>
          <label className="block mb-2 text-md font-bold">Add Categories
            <input type="text" className="border border-gray-300 rounded-md px-2 py-1 w-full body-font" value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button onClick={addCategory} className="btn btn-sm" style={{margin:'5px 0 0 0 '}}>
              Add Category
            </button>
          </label>
          <br />
          <button
            onClick={handleCancelClick}
            className="btn" style={{marginRight:'10px'}}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSaveAsDraftClick}
            className="btn" style={{marginRight:'10px'}}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            onClick={handlePublishClick}
            class="btn btn-success"
          >
            Publish
          </button>
        </form>
      )}
      </div>
    </div>
  );
}

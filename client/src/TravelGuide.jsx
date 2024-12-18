import React, { useEffect, useState } from "react";
import axios from "axios";
import ToggleSwitch from "./ToggleSwitch";
import "./TravelGuide.css";

const TravelGuide = () => {
  const [articles, setArticles] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme; // Update the body class based on the theme
  }, [theme]);

  const fetchArticles = (keywords) => {
    axios
      .get(`http://localhost:4001/trips?keywords=${keywords}`)
      .then((response) => {
        setArticles(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
      });
  };

  useEffect(() => {
    fetchArticles(""); // Default fetch
  }, []);

  const handleSearch = (event) => {
    const newKeywords = event.target.value;
    setKeywords(newKeywords);
    fetchArticles(newKeywords);
  };

  const handleCategoryClick = (category, event) => {
    event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Stop propagation to prevent triggering article click
    setKeywords(category);
    fetchArticles(category);
  };

  const handleHeaderClick = () => {
    setKeywords("");
    fetchArticles("");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  const handleArticleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`travel-guide ${theme}`}>
      <header>
        <h1 onClick={handleHeaderClick}>เที่ยวไหนดี</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="ค้นหาที่เที่ยว"
            value={keywords}
            onChange={handleSearch}
          />
        </div>
      </header>
      <div className="toggle-switch-container">
        <ToggleSwitch theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="articles">
        {articles.map((article) => (
          <div
            key={article.eid}
            className="article"
            onClick={() => handleArticleClick(article.url)}
          >
            <img
              src={article.photos[0]}
              alt={article.title}
              className="main-photo"
            />
            <div className="article-content">
              <h2>{article.title}</h2>
              <p>
                {truncateDescription(article.description, 100)}{" "}
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  อ่านต่อ
                </a>
              </p>
              <div className="categories">
                {article.tags.map((tag, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(event) => handleCategoryClick(tag, event)}
                    className="category"
                  >
                    {tag}
                  </a>
                ))}
              </div>
              <div className="photos">
                {article.photos.slice(1).map((photo, index) => (
                  <img key={index} src={photo} alt={`photo-${index}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelGuide;

import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import "../App.css";

import Paginate from "./Paginate";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const query = url.searchParams.get("qInTitle");

  const dataUrl = `http://newsapi.org/v2/everything?qInTitle=${query}&apiKey=09b2a48dc89f416caada3626ec05f9eb&page=${
    page ?? 1
  }&pageSize=6`;

  const res = await fetch(dataUrl);
  const data = await res.json();
  return data;
}

export default function Main() {
  const data = useLoaderData();
  const articles = data.articles;
  const totalArticles = data.totalResults;
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const [, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  // Pagination functions

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set("page", currentPage);
      return prevParams;
    });
  }, [currentPage]);

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  // Search functions

  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setSearchParams((prevParams) => {
        
        prevParams.delete("qInTitle");
        return prevParams;
      });
    } else {
      setTimeout(() => {
        setSearchParams((prevParams) => {
        
          prevParams.set("qInTitle", value);
          return prevParams;
        });
      }, 300);
    }
  }

  return (
    <main className="main">
      <div className="filters">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            name="search"
            placeholder="search articles"
            onChange={handleSearchChange}
          />
          <select name="category">
            <option value="">Sort by</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Published at</option>
          </select>
        </form>
      </div>
      <section className="articleContainer">
        {articles?.map((article, index) => (
          <article key={index} className="article">
            <img
              src={article.urlToImage}
              alt="article img"
              className="articleImg"
            />
            <div className="articleBody">
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          </article>
        ))}
      </section>
      <div className="paginationContainer">
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </main>
  );
}

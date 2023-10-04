import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import "../App.css";

import Paginate from "./Paginate";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const query = url.searchParams.get("q");

  const dataUrl = `http://newsapi.org/v2/everything?q=${query}&apiKey=09b2a48dc89f416caada3626ec05f9eb&page=${
    page ?? 1
  }&pageSize=6`;

  const res = await fetch(dataUrl);
  const data = await res.json();
  return data;
}

export default function Main() {
  const data = useLoaderData();
  const initialData = data.articles;
  const totalArticles = data.totalResults;
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const [searchResults, setSearchResults] = useState(initialData);
  const query = searchParams.get("q");

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

  function handleChange(e) {
    if (!e.target.value) {
      setSearchParams((prevParams) => {
        prevParams.delete("q");
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.set("q", e.target.value);
        return prevParams;
      });
    }
  }

  return (
    <main className="main">
      <div className="filters">
        <form>
          <input
            type="search"
            name="search"
            placeholder="search articles"
            onChange={handleChange}
          />
          <select name="category">
            <option value="">Sort by</option>
            <option value="oldestFirst">oldest first</option>
            <option value="newestFirst">newest first</option>
            <option value="groupedBySource">grouped by source</option>
          </select>
        </form>
      </div>
      <section className="articleContainer">
        {initialData?.map((article, index) => (
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

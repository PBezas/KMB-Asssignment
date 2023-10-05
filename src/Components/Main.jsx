import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import "../App.css";

import Paginate from "./Paginate";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("qInTitle");
  const sortBy = url.searchParams.get("sortBy");
  const searchParam = search ? `&qInTitle=${search}` : ``;
  const sortParam = sortBy ? `&ssortBy=${sortBy}` : ``;

  //From the two endpoint options provided in the test pdf, I chose 'everything' endpoint, because is the only one (based on it's documentation) that provides the option of limiting the search search to only within the title of the article and had the option of sortBy in the request parameters.

  const dataUrl =
    `https://newsapi.org/v2/everything?apiKey=09b2a48dc89f416caada3626ec05f9eb&page=${
      page ?? 1
    }&pageSize=6` +
    searchParam +
    sortParam;

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");

  // Pagination functionality

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

  // Search functionality

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setSearchParams((prevParams) => {
          prevParams.delete("qInTitle");
          return prevParams;
        });
      } else {
        setSearchParams((prevParams) => {
          prevParams.set("qInTitle", searchTerm);
          return prevParams;
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  }

  // Sort functionality

  //In sort by droplist I used the given options: "relevancy", "popularity", published At" because (based on documentation) I didn't have the option of filtering the data neither by "oldest first" (because from my research on internet there must be the "order" request param that didn't exist in this api) nor by "grouped by source" because it's not a option given by the documentation of the api.

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sortTerm) {
        setSearchParams((prevParams) => {
          prevParams.delete("sortBy");
          return prevParams;
        });
      } else {
        setSearchParams((prevParams) => {
          prevParams.set("sortBy", sortTerm);
          return prevParams;
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [sortTerm]);

  function handleSortChange(e) {
    const value = e.target.value;
    setSortTerm(value);
  }

  return (
    <main className="main">
      <div className="filters">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            name="search"
            value={searchTerm}
            placeholder="search articles"
            onChange={handleSearchChange}
          />
          <select name="sortBy" value={sortTerm} onChange={handleSortChange}>
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

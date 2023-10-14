import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import "../App.css";

import Card from "./Card";
import Paginate from "./Paginate";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("qInTitle");
  const sortBy = url.searchParams.get("sortBy");
  const sortParam = sortBy ? `&sortBy=${sortBy}` : ``;

  const dataUrl =
    `https://newsapi.org/v2/everything?apiKey=1a877f6de7b9490082dfedd79812c371&page=${
      page ?? 1
    }&pageSize=6&qInTitle=${search}` + sortParam;

  const res = await fetch(dataUrl);
  const data = await res.json();
  return data;
}

export default function MainPage() {
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
          prevParams.set("qInTitle", searchTerm.toLowerCase());
          return prevParams;
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
  }

  // Sort functionality

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
        {articles?.map(({ urlToImage, title, content }, index) => (
          <Card
            key={index}
            urlToImage={urlToImage}
            title={title}
            content={content}
          />
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

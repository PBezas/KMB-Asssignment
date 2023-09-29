import { useState, useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import "../App.css";

import Paginate from "./Paginate";

export async function loader() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=21f9133ff93f41d58ef769752661963d"
  );
  const data = await res.json();
  return data.articles;
}

export default function Main() {
  const articles = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const searchFilter = searchParams.get("search");

  function handleChange(event) {
    const { name, value } = event.target;
    setTimeout(() => {
      setSearchParams({ [name]: value });
    }, 1500);
  }

  const lastIndex = currentPage * articlesPerPage;
  const firstIndex = lastIndex - articlesPerPage;
  const currentArticles = articles?.slice(firstIndex, lastIndex);

  const filteredArticles =
    searchFilter !== null
      ? currentArticles.filter((article) =>
          article.title.includes(searchFilter.toLowerCase())
        )
      : currentArticles;

  console.log(searchFilter);

  function paginate(pageNo) {
    setCurrentPage(pageNo);
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function nextPage() {
    if (currentPage !== Math.ceil(articles?.length / articlesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <main className="main">
      <div className="searchFild">
        <form>
          <input
            type="search"
            name="search"
            placeholder="search channers"
            onChange={handleChange}
          />
        </form>
      </div>
      <section className="articleContainer">
        {filteredArticles?.map((article, index) => (
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
          articlesPerPage={articlesPerPage}
          totalArticles={articles?.length}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </main>
  );
}

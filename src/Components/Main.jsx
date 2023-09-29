import { useState } from "react";
import { useLoaderData } from "react-router-dom";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const lastIndex = currentPage * articlesPerPage;
  const firstIndex = lastIndex - articlesPerPage;
  const currentArticles = articles?.slice(firstIndex, lastIndex);

  function paginate(pageNo) {
    setCurrentPage(pageNo);
  }

  return (
    <main className="main">
      <div className="searchFild">
        <form>
          <input type="search" name="search" placeholder="search channers" />
        </form>
      </div>
      <section className="articleContainer">
        {currentArticles?.map((article, index) => (
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
        />
      </div>
    </main>
  );
}

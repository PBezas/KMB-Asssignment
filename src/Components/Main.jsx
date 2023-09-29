import { useLoaderData } from "react-router-dom";
import "../App.css";

export async function loader() {
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=apple&from=2023-09-28&to=2023-09-28&sortBy=popularity&apiKey=21f9133ff93f41d58ef769752661963d"
  );
  const data = await res.json();
  return data.articles;
}

export default function Main() {
  const articles = useLoaderData();

  console.log(articles);
  return (
    <main className="main">
      <div className="searchFild">
        <form>
          <input type="search" name="search" placeholder="search channers" />
        </form>
      </div>
      <section className="articlesContainer"></section>
      <div className="paginationContainer"></div>
    </main>
  );
}

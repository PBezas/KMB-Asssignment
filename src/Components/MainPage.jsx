import styles from "./MainPage.module.css";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import "../App.css";

import Card from "./Card";
import NoResults from "./NoResults";
import Paginate from "./Paginate";

import debounce from "lodash.debounce";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const query = searchParams.get("qInTitle");
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useNavigation();
  const searchRef = useRef(false);

  useEffect(() => {
    if (searchRef.current && state === "loading") {
      setIsLoading(true);
    } else if (searchRef.current && state === "idle") {
      setIsLoading(false);
      searchRef.current = false;
    }
  }, [state]);

  // Pagination functionality

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set("page", currentPage);
      return prevParams;
    });
  }, [currentPage]);

  // Search functionality

  function handleSearch(e) {
    const value = e.target.value;
    searchRef.current = true;

    if (!value) {
      setSearchParams((prevParams) => {
        prevParams.delete("qInTitle");
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.set("qInTitle", value.toLowerCase());
        return prevParams;
      });
    }
  }
  const debounceSearch = useMemo(() => debounce(handleSearch, 300));

  // Sort functionality

  function handleSort(e) {
    const value = e.target.value;
    if (!value) {
      setSearchParams((prevParams) => {
        prevParams.delete("sortBy");
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.set("sortBy", value);
        return prevParams;
      });
    }
  }

  const debounceSort = debounce(handleSort, 300);

  return (
    <main className={styles.main}>
      <div className={styles.filters}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formFieldWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              type="search"
              name="search"
              placeholder="Search articles"
              onChange={debounceSearch}
              className={styles.formField}
            />
          </div>
          <div className={styles.formFieldWrapper}>
            <span>
              <UnfoldMoreIcon className={styles.upAndDownArrow}/>
            </span>
            <select
              name="sortBy"
              onChange={debounceSort}
              className={styles.formField}
            >
              <option value="">Sort by</option>
              <option value="relevancy">Relevancy</option>
              <option value="popularity">Popularity</option>
              <option value="publishedAt">Published at</option>
            </select>
          </div>
        </form>
      </div>
      {!isLoading ? (
        <section className={styles.articleContainer}>
          {articles?.length === 0 ? (
            <NoResults query={query} />
          ) : (
            articles?.map(({ urlToImage, title, content }, index) => (
              <Card
                key={index}
                urlToImage={urlToImage}
                title={title}
                content={content}
              />
            ))
          )}
        </section>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <div className={styles.appPagination}>
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}

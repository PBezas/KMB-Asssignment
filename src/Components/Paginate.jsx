import { useEffect, useState } from "react";
import styles from "./Paginate.module.css";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginate({ setSearchParams, totalArticles }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set("page", currentPage);
      return prevParams;
    });
  }, [currentPage]);

  function handleChange(e, value) {
    setCurrentPage(value);
  }
  return (
    <Stack spacing={2} className={styles.pagination}>
      <Pagination
        count={totalPages}
        page={currentPage}
        hidePrevButton={currentPage === 1}
        hideNextButton={currentPage >= totalPages}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
}

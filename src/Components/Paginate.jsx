import styles from "./Paginate.module.css";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginate({ currentPage, totalPages, setCurrentPage }) {
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

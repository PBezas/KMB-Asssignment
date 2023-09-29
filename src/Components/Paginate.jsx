import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

export default function Paginate({
  articlesPerPage,
  totalArticles,
  paginate,
  prevPage,
  nextPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <button onClick={prevPage} className="arrowBtn">
        <SlArrowLeft />
      </button>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="pageNumber"
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button onClick={nextPage} className="arrowBtn">
        <SlArrowRight />
      </button>
    </>
  );
}

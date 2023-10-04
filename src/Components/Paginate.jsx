import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

export default function Paginate({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
}) {
  return (
    <>
      <button
        className="arrowBtn"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <SlArrowLeft />
      </button>
      <div className="pagination">
        <p className="pageNumber">{currentPage}</p>
        <span>of {totalPages}</span>
      </div>
      <button className="arrowBtn" onClick={nextPage} disabled={!totalPages}>
        <SlArrowRight />
      </button>
    </>
  );
}

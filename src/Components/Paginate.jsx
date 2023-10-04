import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

export default function Paginate({ currentPage, totalPages }) {
  return (
    <>
      <button className="arrowBtn">
        <SlArrowLeft />
      </button>
      <div className="pagination">
        <p className="pageNumber">{currentPage}</p>
        <span>of {totalPages}</span>
      </div>
      <button className="arrowBtn">
        <SlArrowRight />
      </button>
    </>
  );
}

export default function Paginate({ articlesPerPage, totalArticles, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
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
    </>
  );
}

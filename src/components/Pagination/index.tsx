interface IProps {
  currentPage?: any; // currentPage
  totalPages?: any; // pageSize
  setCurrentPage?: any;
}

const Pagination = (props: IProps) => {
  const { totalPages, currentPage, setCurrentPage } = props;

  let middlePagination;

  if (totalPages <= 5) {
    middlePagination = [...Array(totalPages)].map((_, idx) => (
      <li
        key={idx}
        className={
          idx + 1 === currentPage && currentPage !== 1
            ? "item__pagination__list isactive"
            : "item__pagination__list"
        }
        onClick={() => setCurrentPage(idx + 1)}
      >
        <span>{idx + 1}</span>
      </li>
    ));
  }

  return (
    <>
      {totalPages > 1 && (
        <ul className="item__pagination">
          <button
            className="item__pagination__list"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Privious
          </button>
          {middlePagination}
          <button
            className="item__pagination__list"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </ul>
      )}
    </>
  );
};

export default Pagination;

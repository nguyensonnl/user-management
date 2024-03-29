interface IProps {
  currentPage?: any; // currentPage
  totalPages?: any; // pageSize
  onChangePage?: any;
}

const Pagination = (props: IProps) => {
  const { totalPages, currentPage, onChangePage } = props;

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
        //onClick={() => setCurrentPage(idx + 1)}
        onClick={() => onChangePage(idx + 1)}
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
            // onClick={() => setCurrentPage(currentPage - 1)}
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#8920;
          </button>
          {middlePagination}
          <button
            className="item__pagination__list"
            //onClick={() => setCurrentPage(currentPage + 1)}
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &#8921;
          </button>
        </ul>
      )}
    </>
  );
};

export default Pagination;

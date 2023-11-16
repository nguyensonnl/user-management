import { useState } from "react";

interface IProps {
  currentPage?: any;
  setCurrentPage?: any;
  totalPages?: any;
}

const Pagination = (props: IProps) => {
  const { totalPages, currentPage, setCurrentPage } = props;
  const [idPage, setIdPage] = useState<number | null>(null);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePriviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setIdPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
      setIdPage(currentPage + 1);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setIdPage(page);
  };

  return (
    <>
      {totalPages !== 1 && (
        <ul className="item__pagination">
          <li
            className="item__pagination__list"
            onClick={() => handlePriviousPage()}
          >
            Privious
          </li>
          {pages &&
            pages.length > 0 &&
            pages.map((page: any, index: any) => (
              <li
                key={index}
                className={
                  page === idPage
                    ? "item__pagination__list isactive"
                    : "item__pagination__list"
                }
                onClick={() => handleChangePage(page)}
              >
                <span>{page}</span>
              </li>
            ))}
          <li
            className="item__pagination__list"
            onClick={() => handleNextPage()}
          >
            Next
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;

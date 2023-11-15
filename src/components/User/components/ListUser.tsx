import dayjs from "dayjs";
const ListUser = (props: any) => {
  const {
    users,
    onDelete,
    onUpdate,
    pages,
    onChangePage,
    currentPage,
    setCurrentPage,
    totalPages,
    currentLimit,
  } = props;

  const handlePriviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = (idUser: any) => {
    onDelete(idUser);
  };

  const handleUpdate = (idUser: any) => {
    onUpdate(idUser);
  };

  const handleChangePage = () => {
    onChangePage();
  };
  return (
    <div className="list__user item__table">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>CreatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item: any, index: any) => (
              <tr key={index}>
                <>
                  <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.Role?.name}</td>
                  <td>{dayjs(item.createdAt).format("DD/MM/YYYY h:mm A")}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delele
                    </button>
                  </td>
                </>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="footer">
        <ul className="item__pagination">
          <li onClick={() => handlePriviousPage()}>Privious</li>
          {pages &&
            pages.length > 0 &&
            pages.map((item: any) => (
              <li className="item__pagination__list" onClick={handleChangePage}>
                <span>{item}</span>
              </li>
            ))}
          <li onClick={() => handleNextPage()}>Next</li>
        </ul>
      </div>
    </div>
  );
};

export default ListUser;

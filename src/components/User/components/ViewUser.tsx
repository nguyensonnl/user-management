import dayjs from "dayjs";
import Pagination from "../../Pagination";

interface IProps {
  users?: any;
  currentPage?: any;
  setCurrentPage?: any;
  totalPages?: any;
  currentLimit?: any;
  onDeleteUser?: any;
  onUpdateUser?: any;
  setShow?: any;
  handleChangePage?: any;
}

const ViewUser = (props: IProps) => {
  const {
    users,
    totalPages,
    currentPage,
    setCurrentPage,
    currentLimit,
    onUpdateUser,
    onDeleteUser,
    setShow,
    handleChangePage,
  } = props;

  const handleUpdateUser = (userId: number) => {
    setShow(true);
    onUpdateUser(userId);
  };

  const handleDeleteUser = async (userId: number) => {
    onDeleteUser(userId);
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
            <th>Gender</th>
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
                  <td>{item.gender}</td>
                  <td>{dayjs(item.createdAt).format("DD/MM/YYYY h:mm A")}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateUser(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item.id)}
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
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={+currentPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ViewUser;

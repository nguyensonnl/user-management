import dayjs from "dayjs";
import Pagination from "../../Pagination";

interface IProps {
  listRole?: any;
  onUpdate?: any;
  totalPages?: any;
  limit?: any;
  page?: any;
  onChangePage?: any;
}

const ViewRole = (props: IProps) => {
  const { listRole, onUpdate, totalPages, limit, page, onChangePage } = props;

  const handleUpdate = (roleId: any) => {
    onUpdate(roleId);
  };

  return (
    <div className="list__role">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>CreatedAt</th>
            <th>UpdateAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listRole &&
            listRole.length > 0 &&
            listRole.map((item: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                <td>{dayjs(item.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="footer">
        <Pagination
          onChangePage={onChangePage}
          currentPage={+page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ViewRole;

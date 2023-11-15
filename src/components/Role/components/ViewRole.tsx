import dayjs from "dayjs";

interface IProps {
  listRole?: any;
  onUpdate?: any;
}

const ViewRole = (props: IProps) => {
  const { listRole, onUpdate } = props;

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
      <div className="list__role__footer">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ViewRole;

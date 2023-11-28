import Pagination from "../../Pagination";
import { IPermission } from "../../../types/permission.type";

interface IProps {
  permissions: IPermission[];
  handleChangePage?: any;
  limit?: any;
  page?: any;
  totalPages?: any;
}

const ViewPermission = (props: IProps) => {
  const { permissions, handleChangePage, limit, page, totalPages } = props;

  return (
    <div className="list__permission item__table">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>API</th>
            <th>Description</th>
            <th>Module</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {permissions &&
            permissions.length > 0 &&
            permissions.map((item: any, index: any) => (
              <tr key={index}>
                <th>{(page - 1) * limit + index + 1}</th>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>{item.module}</td>
                <td>
                  <button className="btn btn-success">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}

          {permissions && permissions.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", border: "none" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="footer">
        {permissions && permissions.length !== 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={+page}
            onChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default ViewPermission;

import React from "react";
import { IPermission } from "../../../types/role.type";

interface IProps {
  permissions: IPermission[];
}

const ViewPermission = (props: IProps) => {
  const { permissions } = props;

  return (
    <div className="list__permission">
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
                <th>{index + 1}</th>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>{item.module}</td>
                <td>
                  <button className="btn btn-success">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPermission;

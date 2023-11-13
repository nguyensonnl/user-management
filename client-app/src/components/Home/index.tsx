import { useEffect, useState } from "react";
import Layout from "../Layout";
import userService from "../../api/userService";
import groupService from "../../api/groupService";
import roleService from "../../api/roleService";

const Home = () => {
  const [listUser, setListUser] = useState<any>();
  const [listRole, setListRole] = useState<any>();
  const [listPermission, setListPermission] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const [resUser, resRole, resPermission] = await Promise.all([
        userService.getAllUser(),
        groupService.getAllGroup(),
        roleService.getAllRole(),
      ]);
      setListUser(resUser.DT);
      setListRole(resRole.DT);
      setListPermission(resPermission.DT);
    };
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col col-6">
              <div className="alert alert-primary" role="alert">
                Tổng user: {listUser && listUser.length}
              </div>
            </div>
            <div className="col col-6">
              <div className="alert alert-secondary" role="alert">
                Tổng vai trò: {listRole && listRole.length}
              </div>
            </div>
            <div className="col col-6">
              <div className="alert alert-success" role="alert">
                Tổng quyền hạn: {listPermission && listPermission.length}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

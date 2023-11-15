import { useEffect, useState, useRef } from "react";
import Layout from "../Layout";
import userService from "../../api/userService";
import roleService from "../../api/roleService";
import permisisonService from "../../api/permissionService";
import Access from "../Access";
import { ALL_PERMISSIONS } from "../../constants/permisison";

const Home = () => {
  const [listUser, setListUser] = useState<any>();
  const [listRole, setListRole] = useState<any>();
  const [listPermission, setListPermission] = useState<any>();
  const stateRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (stateRef.current === false) {
        stateRef.current = true;
        const [resUser, resRole, resPermission] = await Promise.all([
          userService.getAllUser(),
          roleService.getRole(),
          permisisonService.getPermission(),
        ]);
        if (resRole && resPermission && resUser) {
          setListUser(resUser.DT);
          setListRole(resRole.DT);
          setListPermission(resPermission.DT);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <Access permission={ALL_PERMISSIONS.ROLES.GET_PAGINATE}>
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
        </Access>
      </Layout>
    </>
  );
};

export default Home;

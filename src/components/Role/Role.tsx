import "./Role.scss";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import Layout from "../Layout";
import { Button } from "react-bootstrap";
import ModalRole from "./components/ModalRole";
import ViewRole from "./components/ViewRole";
import roleService from "../../api/roleService";
import permisisonService from "../../api/permissionService";
import Access from "../Access";
import { ALL_PERMISSIONS } from "../../constants/permisison";
import useDebounce from "../../hooks/useDebounce";

/*
sử dụng useRef để ngăn chặn call api 2 lần
useRef sẽ giữ lại giá trị sau mỗi lần re-render

tạo state lưu giữ trạng thái của select
Luôn tạo một state danh khác sau khi đã lọc theo select
*/

/**
 * Hiển thị các quyền theo tên module: gom nhóm theo module
 * Handle single checkbox, multiple checkbox, check all
 * Gán quyền cho vai trò tương ứng
 *
 */

const Role = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listPermisison, setListPermission] = useState([]);
  const [listRole, setListRole] = useState([]);
  const stateRef = useRef(false);
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    fetchPermission();
  }, []);

  const fetchPermission = async () => {
    try {
      if (stateRef.current === false) {
        stateRef.current = true;
        const resPermission = await permisisonService.getPermission();

        if (resPermission && resPermission.EC === 0) {
          setListPermission(resPermission.DT);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  //handling search, filter, pagination
  const [search, setSearch] = useState<string>("");
  const debouceValue = useDebounce(search, 300);
  const [totalPages, setTotolPages] = useState();
  const [limit, setLimit] = useState();
  const [queryParams, setQueryParams] = useState({
    page: "1",
    limit: "5",
  });

  useEffect(() => {
    fetchRole();
  }, [queryParams, debouceValue]);

  const getQueryParams = () => {
    const queryParamsURL = new URLSearchParams();

    if (queryParams.page && queryParams.limit) {
      queryParamsURL.set("page", queryParams.page);
      queryParamsURL.set("limit", queryParams.limit);
    }

    if (debouceValue) {
      queryParamsURL.set("search", debouceValue);
    }
    return queryParamsURL.toString();
  };

  const handleChangePage = (currentPage: any) => {
    setQueryParams({
      ...queryParams,
      page: currentPage,
    });
  };
  const fetchRole = async () => {
    try {
      const query = getQueryParams();
      const res = await roleService.getRoleV2(query);
      setListRole(res.data);
      setTotolPages(res.paginate.totalPages);
      setLimit(res.paginate.limit);
    } catch (error) {
      console.log(error);
    }
  };
  //handling search, filter, pagination

  const handleUpdateRole = (roleId: number) => {
    setRoleId(roleId);
  };

  return (
    <Layout>
      <Access permission={ALL_PERMISSIONS.ROLES.GET_PAGINATE}>
        <div className="role__page">
          <div className="item__heading">
            <h2>Danh sách vai trò</h2>
            <Button variant="primary" onClick={handleOpenModal}>
              Tạo mới vai trò
            </Button>
          </div>

          <div className="item__control">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="search..."
              className="item__input"
            />
          </div>

          <ViewRole
            listRole={listRole}
            totalPages={totalPages}
            limit={limit}
            page={queryParams.page}
            onChangePage={handleChangePage}
            onUpdateRole={handleUpdateRole}
            setOpenModal={setOpenModal}
          />

          <ModalRole
            openModal={openModal}
            handleClose={handleClose}
            listPermission={listPermisison}
            roleId={roleId}
          />
        </div>
      </Access>
    </Layout>
  );
};

export default Role;

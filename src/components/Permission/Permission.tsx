import "./Permission.scss";
import { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import { Button } from "react-bootstrap";

import permisisonService from "../../api/permissionService";
import ViewPermission from "./components/ViewPermission";
import ModalPermission from "./components/ModalPermission";
import useDebounce from "../../hooks/useDebounce";

const Permission = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listPermission, setListPermission] = useState([]);
  const stateRef = useRef<boolean>(false);

  //Handling filte, search, pagination data
  const [queryParams, setQueryParams] = useState({
    page: "1",
    limit: "5",
    module: "",
  });
  const [totalPages, setTotalPages] = useState(); //pageSize
  const [limit, setLimit] = useState();
  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce(search, 300);

  const getQueryParams = () => {
    const queryParamsURL = new URLSearchParams();

    if (queryParams.page && queryParams.limit) {
      queryParamsURL.set("page", queryParams.page);
      queryParamsURL.set("limit", queryParams.limit);
    }

    if (debounceValue) {
      queryParamsURL.set("search", debounceValue);
    }

    if (queryParams.module && queryParams.module !== "All") {
      queryParamsURL.set("module", queryParams.module);
    }

    return queryParamsURL.toString();
  };

  const handleChangeElement = (key: any, value: any) => {
    setQueryParams((prevQueryParams) => ({ ...prevQueryParams, [key]: value }));
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const query = getQueryParams();
        const res = await permisisonService.getPermissionV2(query);

        setListPermission(res.data);
        setTotalPages(res.paginate.totalPages);
        setLimit(res.paginate.limit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermissions();
  }, [queryParams, debounceValue]);

  const handleChangePage = (currentPage: any) => {
    setQueryParams({
      ...queryParams,
      page: currentPage,
    });
  };
  //Handling filter, search, pagination data

  // useEffect(() => {
  //   const fetchPermission = async () => {
  //     if (stateRef.current === false) {
  //       stateRef.current = true;
  //       try {
  //         const res = await permisisonService.getPermission();
  //         setListPermission(res.DT);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   fetchPermission();
  // }, []);

  const handleCreate = async (data: any) => {
    try {
      const res = await permisisonService.createPermission(data);
      if (res && +res.EC === 0) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="permission__container">
        <section className="item__heading">
          <h2>Danh sách quyền hạn</h2>
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            Thêm quyền hạn
          </Button>
        </section>

        <section className="item__control">
          <div className="item__name" style={{ flexBasis: "40%" }}>
            <label style={{ marginRight: "5px" }}>Search:</label>
            <input
              type="text"
              placeholder="Search..."
              className="item__input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="item__name">
            <label style={{ marginRight: "5px" }}>Sort by modules:</label>
            <select
              onChange={(e) => handleChangeElement("module", e.target.value)}
            >
              <option>All</option>
              <option>ROLES</option>
              <option>PERMISSIONS</option>
              <option>USERS</option>
            </select>
          </div>
        </section>

        <ViewPermission
          permissions={listPermission}
          handleChangePage={handleChangePage}
          totalPages={totalPages}
          limit={limit}
          page={queryParams.page}
        />

        <ModalPermission
          openModal={openModal}
          setOpenModal={() => setOpenModal(!openModal)}
          onCreate={handleCreate}
        />
      </div>
    </Layout>
  );
};

export default Permission;

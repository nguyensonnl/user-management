import "./User.scss";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Layout from "../Layout";
import ViewUser from "./components/ViewUser";
import userService from "../../api/userService";
import { Button } from "react-bootstrap";
import ModalUser from "./components/ModalUser";
import axios from "axios";
import queryString from "query-string";
import { debounce, filter } from "lodash";
import useDebounce from "../../hooks/useDebounce";
import roleService from "../../api/roleService";

const UserV3 = () => {
  const [listUser, setListUser] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    setShow(!show);
  };

  const stateRef = useRef<boolean>(false);
  const [listRole, setListRole] = useState<any[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      if (stateRef.current === false) {
        stateRef.current = true;
        try {
          const res = await roleService.getRole();
          setListRole(res.DT);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchRole();
  }, []);

  const [users, setUsers] = useState();
  const [queryParams, setQueryParams] = useState({
    search: "",
    sortBy: "",
    sortOrder: "",
    filterBy: "",
    filterValue: "",
    role: "",
    page: "1",
    pageSize: "5",
  });

  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState();
  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce(search, 300);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let query = `?search=${debounceValue}`;
  //       const res = await axios.get(
  //         `http://localhost:8181/api/v1/user/get${debounceValue ? query : ""}`
  //       );
  //       setUsers(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [debounceValue]);

  const getQueryParams = () => {
    const queryParamsURL = new URLSearchParams();
    if (queryParams.page && queryParams.pageSize) {
      queryParamsURL.set("page", queryParams.page);
      queryParamsURL.set("pageSize", queryParams.pageSize);
    }
    if (queryParams.sortBy) queryParamsURL.set("sortBy", queryParams.sortBy);
    if (queryParams.sortOrder)
      queryParamsURL.set("sortOrder", queryParams.sortOrder);
    if (debounceValue) queryParamsURL.set("search", debounceValue);
    if (queryParams.search) queryParamsURL.set("search", queryParams.search);
    if (queryParams.filterBy)
      queryParamsURL.set("filterBy", queryParams.filterBy);
    if (queryParams.filterValue && queryParams.filterValue !== "All")
      queryParamsURL.set("filterValue", queryParams.filterValue);

    if (queryParams.role && queryParams.role !== "All")
      queryParamsURL.set("role", queryParams.role);
    return queryParamsURL.toString();
  };

  //get value filter
  const getQueryParamsV1 = (filters: any) => {
    const queryParams = Object.entries(filters)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return queryParams;
  };

  const getQueryParamsV2 = (query: string) => {
    let queryExample = `http://localhost:8181/api/v1/user/get?`;

    if (queryParams.sortBy) {
      query += `&sortBy=${queryParams.sortBy}`;
    }
    if (queryParams.sortOrder) {
      query += `&sortOrder=${queryParams.sortOrder}`;
    }
    if (debounceValue) {
      query += `&search=${debounceValue}`;
    }
    if (queryParams.filterBy) {
      query += `&filterBy=${queryParams.filterBy}`;
    }

    if (queryParams.filterValue === "All") {
      query += ``;
    } else {
      if (queryParams.filterValue) {
        query += `&filterValue=${queryParams.filterValue}`;
      }
    }
    return query;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = getQueryParams();
        const res = await userService.getUserV2(query);
        setUsers(res.data);
        setTotalPages(res.paginate.totalPages); //pageSize
        setLimit(res.paginate.limit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [queryParams, debounceValue]);

  const handleChangeInputParams = (key: any, value: any) => {
    setQueryParams((prevQueryParams) => ({ ...prevQueryParams, [key]: value }));
  };

  const handleChangePage = (currentPage: any) => {
    setQueryParams({
      ...queryParams,
      page: currentPage,
    });
  };

  //handle query params

  //get user and pagination
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [currentLimit] = useState<number>(5);
  // const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const resUser = await userService.getAllUser(currentPage, currentLimit);

  //       if (resUser && +resUser.EC === 0) {
  //         setListUser(resUser.DT.users);
  //         setTotalPages(resUser.DT.totalPages);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUser();
  // }, [currentPage]);

  //doing action
  const handleUpdateUser = (userId: number) => {
    setUserId(userId);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const isDeleted = confirm("Bạn có chắc muốn xóa user này không?");
      if (isDeleted) {
        const res = await userService.deleteUser({ id: userId });
        if (res && +res.EC === 0) {
          const udpateUsers = listUser.filter(
            (item: any) => item.id !== userId
          );
          setListUser(udpateUsers);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //doing action

  return (
    <Layout>
      <div className="user__container">
        <section className="item__heading">
          <h2>Danh sách người dùng</h2>
          <Button variant="primary" onClick={handleShow}>
            Create new user
          </Button>
        </section>

        <section className="item__control">
          <div className="item__name" style={{ flexBasis: "36%" }}>
            <label style={{ marginRight: "5px" }}>Search:</label>
            <input
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="item__input"
            />
          </div>

          <div className="item__name">
            <label style={{ marginRight: "5px" }}>Sort by role: </label>
            <select
              value={queryParams.role}
              onChange={(e) => handleChangeInputParams("role", e.target.value)}
            >
              <option>All</option>
              {listRole &&
                listRole.length > 0 &&
                listRole.map((role, idx) => (
                  <option value={role.id} key={idx}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="item__name">
            <label style={{ marginRight: "5px" }}>Sort by gender: </label>
            <select
              value={queryParams.filterValue}
              onChange={(e) =>
                handleChangeInputParams("filterValue", e.target.value)
              }
            >
              <option>All</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
        </section>

        <ViewUser
          // users={listUser}
          users={users}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          //currentPage={currentPage}
          //setCurrentPage={setCurrentPage}
          //currentLimit={currentLimit}
          currentPage={queryParams.page}
          handleChangePage={handleChangePage}
          currentLimit={limit}
          totalPages={totalPages}
          setShow={setShow}
        />

        <ModalUser show={show} setShow={setShow} userId={userId} />
      </div>
    </Layout>
  );
};

export default UserV3;

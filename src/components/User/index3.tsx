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

/**
 * handle query params with api from server
 * logic:
 * tạo state lưu các params gửi lên server
 * khi có sự thay đổi thì update params in url api
 *
 */

const UserV3 = () => {
  const [listUser, setListUser] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  //modal
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    setShow(!show);
  };
  //modal

  /**
   * handle query params
   * GIải quyết được params khi nào có thì mới show in api
   * bug:
   * thay đổi trên url khi state thay đổi
   * get?seach=a&sortBy=createdAt&sortOrder=asc
   * get?seach=ad&sortBy=createdAt&sortOrder=asc
   * get?seach=adm&sortBy=createdAt&sortOrder=asc
   * get?seach=admi&sortBy=createdAt&sortOrder=asc
   * get?seach=admin&sortBy=createdAt&sortOrder=asc
   *
   * uesing debounce
   */

  const [users, setUsers] = useState();
  const [queryParams, setQueryParams] = useState({
    search: "",
    sortBy: "",
    sortOrder: "",
    filterBy: "gender",
    filterValue: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const queryParams = Object.entries(filters)
        //   .filter(([_, value]) => value !== "")
        //   .map(([key, value]) => `${key}=${value}`)
        //   .join("&");

        // const apiUrl = `http://localhost:8181/api/v1/user/get${
        //   queryParams ? `?${queryParams}` : ""
        // }`;
        const queryParamsURL = new URLSearchParams();
        if (queryParams.sortBy)
          queryParamsURL.set("sortBy", queryParams.sortBy);
        if (queryParams.sortOrder)
          queryParamsURL.set("sortOrder", queryParams.sortOrder);
        if (queryParams.search)
          queryParamsURL.set("search", queryParams.search);

        const apiUrl = `http://localhost:8181/api/v1/user/get?${
          queryParams.toString() ? `${queryParams.toString()}` : ""
        }`;

        let query = `http://localhost:8181/api/v1/user/get?`;

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

        const res = await axios.get(query);
        setUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [queryParams, debounceValue]);

  const handleChangeInputParams = (key: any, value: any) => {
    setQueryParams((prevQueryParams) => ({ ...prevQueryParams, [key]: value }));
  };

  //handle query params

  //get user and pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resUser = await userService.getAllUser(currentPage, currentLimit);

        if (resUser && +resUser.EC === 0) {
          setListUser(resUser.DT.users);
          setTotalPages(resUser.DT.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [currentPage]);

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
        <div className="item__heading">
          <h2>Danh sách người dùng</h2>
          <Button variant="primary" onClick={handleShow}>
            Create new user
          </Button>
        </div>
        <div className="item__control">
          <div className="item__name">
            <input type="checkbox" style={{ marginRight: "5px" }} />
            <span>Show all</span>
          </div>
          <div className="item__name">
            <span style={{ marginRight: "5px" }}>Number of rows</span>
            <select>
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
          <div className="item__name">
            <label style={{ marginRight: "5px" }}>Sort by role: </label>
            <select>
              <option>All</option>
              <option>admin</option>
              <option>dev</option>
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

          <input
            // value={filters.search}
            //onChange={(e) => handleChangeInputParams("search", e.target.value)}
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="item__input"
          />
        </div>

        <ViewUser
          // users={listUser}
          users={users}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentLimit={currentLimit}
          setShow={setShow}
        />

        <ModalUser show={show} setShow={setShow} userId={userId} />
      </div>
    </Layout>
  );
};

export default UserV3;

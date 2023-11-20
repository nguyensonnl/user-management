import "./User.scss";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Layout from "../Layout";
import ViewUser from "./components/ViewUser";
import userService from "../../api/userService";
import { Button } from "react-bootstrap";
import ModalUser from "./components/ModalUser";

const User = () => {
  const [listUser, setListUser] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  //modal
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    setShow(!show);
  };
  //modal

  //control data
  const [searchInput, setSearchInput] = useState<string>("");
  const [resultFiltered, setResultFiltered] = useState<any[]>();
  const [selectedResult, setSelectedResult] = useState<string>("");

  const handleChangeSelected = (e: any) => {
    const value = e.target.value;

    console.log(value);

    let temp = [...listUser];

    temp = temp.filter((item) => {
      if (value === "All") {
        return item;
      } else {
        return item?.Role.name === value;
      }
    });
    setResultFiltered(temp);
  };

  const handleChangeSearchInput = (e: any) => {
    setSearchInput(e.target.value);
    let temp = [...listUser];

    temp = temp.filter((item: any) => {
      if (searchInput === "") {
        return item;
      } else {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      }
    });
    setResultFiltered(temp);
  };
  //control data

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
          setResultFiltered(resUser.DT.users);
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
            <select onChange={(e) => handleChangeSelected(e)}>
              <option>All</option>
              <option>admin</option>
              <option>dev</option>
            </select>
          </div>

          <input
            value={searchInput}
            onChange={(e) => handleChangeSearchInput(e)}
            type="text"
            placeholder="Search..."
            className="item__input"
          />
        </div>

        <ViewUser
          users={resultFiltered}
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

export default User;

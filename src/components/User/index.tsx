import "./User.scss";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Layout from "../Layout";
import ViewUser from "./components/ViewUser";
import userService from "../../api/userService";
import { Button } from "react-bootstrap";
import ModalUser from "./components/ModalUser";

const User = () => {
  const [listUser, setListUser] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const handleShow = () => {
    setShow(!show);
  };

  //oding filter
  const [searchInput, setSearchInput] = useState<string>("");

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
    setListUser(temp);
  };
  //doing

  //pagination
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
          <input
            value={searchInput}
            onChange={(e) => handleChangeSearchInput(e)}
            type="text"
            placeholder="Search..."
            className="item__input"
          />
        </div>

        <ViewUser
          users={listUser}
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

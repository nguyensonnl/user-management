import "./User.scss";
import { useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import ListUser from "./components/ListUser";
import userService from "../../api/userService";
import { Button, Modal } from "react-bootstrap";
import roleService from "../../api/roleService";
import axios from "axios";

interface IUser {
  email: string;
  password: string;
  username: string;
  phone: string;
  address: string;
  gender: string | number;
}

const initInputs: IUser = {
  email: "",
  password: "",
  username: "",
  address: "",
  phone: "",
  gender: "",
};

const User = () => {
  const [listUser, setListUser] = useState<any>([]);
  const [listRole, setListRole] = useState([]);
  const [idUserUpdate, setIdUpdateUser] = useState<number | string>("");
  const [inputs, setInputs] = useState(initInputs);
  const [selectRole, setSelectRole] = useState<number | string>("");
  const [show, setShow] = useState<boolean>(false);
  const fetchingRef = useRef(false);

  //doing pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setcurrentLimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleChangePage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  //doing

  useEffect(() => {
    const fetchData = async () => {
      // if (fetchingRef.current === false) {
      //   fetchingRef.current = true;
      try {
        const [resUser, resRole] = await Promise.all([
          userService.getAllUser(currentPage, currentLimit),
          roleService.getRole(),
        ]);
        if ((resRole && +resRole.EC === 0) || (resUser && +resUser.EC === 0)) {
          setListUser(resUser.DT.users);
          setListRole(resRole.DT);
          setTotalPages(resUser.DT.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
      //}
    };
    fetchData();
  }, [currentPage]);

  const handleShow = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
    setInputs(initInputs);
    setIdUpdateUser("");
    setSelectRole("");
  };

  const handleChangeInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleDeleteUser = async (userId: any) => {
    try {
      const data: any = {
        id: userId,
      };

      const res = await userService.deleteUser({ data });
      if (res && +res.EC === 0) {
        const udpateUsers = listUser.filter((item: any) => item.id !== userId);
        setListUser(udpateUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      email: inputs.email,
      password: inputs.password,
      username: inputs.username,
      phone: inputs.phone,
      address: inputs.address,
      gender: inputs.gender,
      role_id: selectRole,
    };

    try {
      const res = await userService.createNewUser(data);
      if (res && +res.EC === 0) {
        window.location.reload();
        setInputs(initInputs);
        setShow(!show);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async (idUser: any) => {
    try {
      const res: any = await axios.get(
        `http://localhost:8181/api/v1/user/${idUser}`
      );
      setShow(true);
      setIdUpdateUser(idUser);
      setInputs({
        email: res.data.DT.email,
        password: "",
        username: res.data.DT.username,
        phone: res.data.DT.phone,
        address: res.data.DT.address,
        gender: res.data.DT.gender,
      });
      setSelectRole(+res.data.DT.roleId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSelect = (e: any) => {
    setSelectRole(+e.target.value);
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
          <input type="text" placeholder="Search..." className="item__input" />
        </div>

        <ListUser
          users={listUser}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
          pages={pages}
          onChangePage={handleChangePage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentLimit={currentLimit}
        />
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Tạo mới user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form__group1">
              <label>
                <span>*</span> Email
              </label>
              <input
                className={
                  idUserUpdate ? "item__input not-allow" : "item__input"
                }
                disabled={idUserUpdate ? true : false}
                type="text"
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="form__group1">
              <label>
                <span>*</span> Password
              </label>
              <input
                className={
                  idUserUpdate ? "item__input not-allow" : "item__input"
                }
                disabled={idUserUpdate ? true : false}
                type="password"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="form__group1">
              <label>
                <span>*</span> Username
              </label>
              <input
                className="item__input"
                type="text"
                placeholder="User name"
                name="username"
                value={inputs.username}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="form__group1">
              <label>
                <span>*</span> Address
              </label>
              <input
                className="item__input"
                type="text"
                placeholder="Address"
                name="address"
                value={inputs.address}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="form__group1">
              <label>
                <span>*</span> Phone
              </label>
              <input
                className="item__input"
                type="text"
                placeholder="Phone"
                name="phone"
                value={inputs.phone}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="form__group1">
              <label>
                <span>*</span> Gender
              </label>
              <select
                style={{
                  padding: "4px 6px",
                  outline: "none",
                  border: "1px solid #ccc",
                }}
                name="gender"
                value={inputs.gender}
                onChange={(e) => handleChangeInput(e)}
              >
                <option>Chọn giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
            <div className="form__group1">
              <label>
                <span>*</span> Role
              </label>
              <select
                style={{
                  padding: "4px 6px",
                  outline: "none",
                  border: "1px solid #ccc",
                }}
                value={selectRole}
                onChange={(e) => handleChangeSelect(e)}
              >
                <option>Chọn vai trò</option>
                {listRole &&
                  listRole.length > 0 &&
                  listRole.map((item: any, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSubmit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default User;

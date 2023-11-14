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

  useEffect(() => {
    const fetchData = async () => {
      if (fetchingRef.current === false) {
        fetchingRef.current = true;
        try {
          const [resUser, resRole] = await Promise.all([
            userService.getAllUser(),
            roleService.getRole(),
          ]);
          if (
            (resRole && +resRole.EC === 0) ||
            (resUser && +resUser.EC === 0)
          ) {
            setListUser(resUser.DT);
            setListRole(resRole.DT);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);
  console.log(listUser);

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
        <div className="heading">
          <h2>List user</h2>
          <Button variant="primary" onClick={handleShow}>
            Create new user
          </Button>

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
        <hr />
        <ListUser
          users={listUser}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </Layout>
  );
};

export default User;

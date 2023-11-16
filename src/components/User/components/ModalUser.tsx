import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import userService from "../../../api/userService";
import roleService from "../../../api/roleService";
import { IUser } from "../../../types/user.type";
import axios from "axios";

interface IProps {
  show?: any;
  setShow?: any;
  userId?: number | null;
}

const initInputs: IUser = {
  email: "",
  password: "",
  username: "",
  address: "",
  phone: "",
  gender: "",
};

const ModalUser = (props: IProps) => {
  const { show, setShow, userId } = props;

  const [selectRole, setSelectRole] = useState<number | string>("");
  const [inputs, setInputs] = useState(initInputs);
  const [listRole, setListRole] = useState([]);
  const stateRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchUserId = async () => {
      if (userId) {
        try {
          const res = await axios.get(
            `http://localhost:8181/api/v1/user/${userId}`
          );
          setInputs({
            email: res.data.DT.email,
            password: res.data.DT.password,
            username: res.data.DT.username,
            address: res.data.DT.address,
            phone: res.data.DT.phone,
            gender: res.data.DT.gender,
          });
          setSelectRole(+res.data.DT.roleId);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserId();
  }, [userId]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (stateRef.current === false) {
          stateRef.current = true;
          const resRole = await roleService.getRole();
          if (resRole && +resRole.EC === 0) {
            setListRole(resRole.DT);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRole();
  }, []);

  const handleChangeInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: any) => {
    setSelectRole(+e.target.value);
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
    const dataUpdate = {
      email: inputs.email,
      password: inputs.password,
      username: inputs.username,
      phone: inputs.phone,
      address: inputs.address,
      gender: inputs.gender,
      role_id: selectRole,
      id: userId,
    };

    if (userId) {
      //update
      const res = await userService.updateUser(dataUpdate);
      if (res && +res.EC === 0) {
        setShow(!show);
        setInputs(initInputs);
        window.location.reload();
      }
    } else {
      //create
      try {
        const res = await userService.createNewUser(data);
        if (res && +res.EC === 0) {
          setInputs(initInputs);
          setShow(!show);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setInputs(initInputs);
    setSelectRole("");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{userId ? "Cập nhật user" : "Tạo mới user"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form__group1">
            <label>
              <span>*</span> Email
            </label>
            <input
              className={userId ? "item__input not-allow" : "item__input"}
              disabled={userId ? true : false}
              type="text"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          {!userId && (
            <div className="form__group1">
              <label>
                <span>*</span> Password
              </label>
              <input
                className={userId ? "item__input not-allow" : "item__input"}
                disabled={userId ? true : false}
                type="password"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
          )}

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
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;

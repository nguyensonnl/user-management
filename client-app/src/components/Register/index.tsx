import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../api/axiosClient";

const Regsiter = () => {
  const navigate = useNavigate();

  interface InputData {
    email: string;
    password: string;
    confirmPassword?: string;
    phone?: string;
    username?: string;
  }

  const initialState: InputData = {
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    username: "",
  };

  const [inputs, setInputs] = useState<InputData>(initialState);

  const inititalValidate: any = {
    isValidEmail: "",
    isValidPassword: "",
    isValidPhone: "",
    isValidUsername: "",
  };

  const [errorValidation, setErrorValidation] = useState(inititalValidate);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const validationInputs = () => {
    setErrorValidation(inititalValidate);

    if (!inputs.email) {
      setErrorValidation({
        ...inititalValidate,
        isValidEmail: "Email không được để trống",
      });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      setErrorValidation({
        ...inititalValidate,
        isValidEmail: "Email không hợp lệ",
      });
      return false;
    }

    if (!inputs.password) {
      setErrorValidation({
        ...inititalValidate,
        isValidPassword: "Mật khẩu không được để trống",
      });
      return false;
    }

    if (inputs.password.length < 5) {
      setErrorValidation({
        ...inititalValidate,
        isValidPassword: "Mật khẩu phải ít nhất 5 ký tự",
      });
      return false;
    }

    if (!inputs.username) {
      setErrorValidation({
        ...inititalValidate,
        isValidUsername: "Tên không được để trống",
      });
      return false;
    }

    if (!inputs.phone) {
      setErrorValidation({
        ...inititalValidate,
        isValidPhone: "Số điện thoại không được để trống",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data: InputData = {
      email: inputs.email,
      password: inputs.password,
      phone: inputs.phone,
      username: inputs.username,
    };

    try {
      const valid = validationInputs();

      if (valid === true) {
        const res: any = await axiosClient.post("/users/register", data);
        if (res.status === 200) {
          setInputs(initialState);
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login__page">
      <div className="login__page__left">
        <div className="brand">Pi Network</div>
        <div className="title">
          Pi Network helps you connect and share with the people in your life.
        </div>
      </div>
      <div className="login__page__right">
        <form className="form-login" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputs.email}
            name="email"
            placeholder="Email address or phone number"
            onChange={(e) => handleChangeInput(e)}
          />

          {errorValidation.isValidEmail && (
            <div>{errorValidation.isValidEmail}</div>
          )}

          <input
            type="password"
            name="password"
            value={inputs.password}
            placeholder="Password"
            onChange={(e) => handleChangeInput(e)}
          />
          {errorValidation.isValidPassword && (
            <div>{errorValidation.isValidPassword}</div>
          )}

          {/* <input
                type="text"
                name="confirmPassword"
                value={inputs.confirmPassword}
                placeholder="Comfirm password"
                onChange={(e) => handleChangeInput(e)}
              /> */}
          <input
            type="text"
            name="username"
            value={inputs.username}
            placeholder="User name"
            onChange={(e) => handleChangeInput(e)}
          />
          {errorValidation.isValidUsername && (
            <div>{errorValidation.isValidUsername}</div>
          )}

          <input
            type="text"
            name="phone"
            value={inputs.phone}
            placeholder="Phone"
            onChange={(e) => handleChangeInput(e)}
          />

          {errorValidation.isValidPhone && (
            <div>{errorValidation.isValidPhone}</div>
          )}

          <button type="submit">Register</button>
        </form>
        <div className="action">
          <div className="forgot__password">
            <Link to="/login" className="link">
              Do you already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regsiter;

import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axiosClient from "../../api/axiosClient";
import { User } from "../../types/user.type";
import { UserContext, UserContextType } from "../../context/UserContext";
import userService from "../../api/userService";

const Login = () => {
  const { loginContext } = useContext(UserContext) as UserContextType;

  const navigate = useNavigate();

  const initialState: User = {
    valueInput: "trucquynh304@gmail.com",
    password: "123456",
  };

  interface propValidate {
    isValueInput?: string;
    isPassword?: string;
  }

  const [inputs, setInputs] = useState<User>(initialState);
  const [errorData, setErrorData] = useState<propValidate>({
    isValueInput: "",
    isPassword: "",
  });

  const validationForm = () => {
    const errors: propValidate = {};

    if (!inputs.valueInput) {
      errors.isValueInput = "Dữ liệu không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(inputs.valueInput)) {
      errors.isValueInput = "Email hoặc số điện thoại không hợp lệ";
    }

    if (!inputs.password) {
      errors.isPassword = "Mật khẩu không được để trống";
    }
    return errors;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const error = validationForm();
      setErrorData(error);

      let body = {
        valueLogin: inputs.valueInput,
        password: inputs.password,
      };

      if (Object.keys(error).length === 0) {
        const res = await userService.login(body);

        if (res && +res.EC === 0) {
          let groupWithRoles = res.DT.groupWithRoles;
          let email = res.DT.email;
          let username = res.DT.username;
          let token = res.DT.access_token;

          let data: any = {
            isAuthenticated: true,
            token,
            account: { groupWithRoles, email, username },
          };
          localStorage.setItem("jwt", token);
          loginContext(data);
          navigate("/");
          setInputs(initialState);
        } else {
          setErrorData({
            isValueInput: "Email hoặc mật khẩu không đung",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login__page">
      <div className="login__page__title">Sign in to your account</div>
      <div className="login__page__content">
        <form className="form__login" onSubmit={(e) => handleSubmit(e)}>
          <div className="form__group">
            <label>Email</label>
            <div className="item__input">
              <input
                type="text"
                value={inputs.valueInput}
                name="valueInput"
                placeholder="Email"
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            {errorData.isValueInput && <div>{errorData.isValueInput}</div>}
          </div>

          <div className="form__group">
            <label>Password</label>
            <div className="item__input">
              <input
                type="password"
                name="password"
                value={inputs.password}
                placeholder="Password"
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            {errorData.isPassword && <div>{errorData.isPassword}</div>}
          </div>

          <div className="action">
            <div className="remember item">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forgot__password item">
              <Link to="/" className="link">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button type="submit" className="btn-login">
            Sign in
          </button>
          <div className="other">Or continue by</div>

          <button className="create__account" onClick={() => handleRegister()}>
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

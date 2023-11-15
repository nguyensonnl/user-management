import "./Sidebar.scss";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar__container">
      <div className="sidebar__content">
        <div className="logo">
          <Link className="navbar-brand" to="/">
            User Managment
          </Link>
        </div>
        <nav className="list__group">
          <NavLink
            className={({ isActive }) =>
              isActive ? "item__link active" : "item__link"
            }
            to="/"
          >
            Dashboard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "item__link active" : "item__link"
            }
            to="/user"
          >
            User
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "item__link active" : "item__link"
            }
            to="/permission"
          >
            Permission
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "item__link active" : "item__link"
            }
            to="/role"
          >
            Role
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

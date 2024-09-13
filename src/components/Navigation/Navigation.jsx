import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const getActiveClassName = ({ isActive }) => clsx(isActive && styles.isActive);

const Navigation = () => {
  return (
    <nav className={styles.header}>
      <ul className={styles.list}>
        <li>
          <NavLink to="/" className={getActiveClassName}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getActiveClassName}>
            Movies
          </NavLink>
        </li>
      </ul>
      <hr className={styles.separator} />
    </nav>
  );
};

export default Navigation;

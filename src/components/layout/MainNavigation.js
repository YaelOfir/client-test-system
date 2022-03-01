import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div >
        <li>
          <Link to="/">Tests System</Link>
        </li>
      </div>
    </header>
  );
}

export default MainNavigation;

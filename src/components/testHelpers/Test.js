import classes from "./Test.module.css";
import TestCard from "../ui/TestCard";
function Test(props) {
  return (
    <li className={classes.item}>
      <TestCard>
        <div className={classes.content}>
          <h3>{props.title}</h3>
        </div>
        <div className={classes.actions}>
          <button>View</button>
        </div>
      </TestCard>
    </li>
  );
}

export default Test;

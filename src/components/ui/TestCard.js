import classes from "./TestCard.module.css";

function TestCard(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default TestCard;

import classes from "./QuestionCard.module.css";

function QuestionCard(props) {
  return <div className={classes.card}>{props.children}
  </div>;
}

export default QuestionCard;

import React from "react";
import { Link } from "react-router-dom";
import classes from "../testHelpers/Test.module.css";

function HomePage() {
  return (
    <div className={classes.content}>
      <Link to={`/all-tests`}>Manage Tests</Link>
      <br />
      <Link to={`/Question`}>Manage Questions</Link>
    </div>
  );
}

export default HomePage;

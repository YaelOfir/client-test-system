import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import classes from "../testHelpers/Test.module.css";
const ViewTest = () => {
  const [test, setTest] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleQuestion(id);
    }
  }, [id]);

  const getSingleQuestion = async (id) => {
    const response = await axios.get(`http://localhost:5000/test/test/${id}`);
    if (response.status === 200) {
      setTest({ ...response.data[0] });
    }
  };

  return (
    <div className={classes.content}>
      <p>{id}</p>
      <h3>Title:</h3>
      <p>{test && test.title}</p>
      <h3>Topic:</h3>
      <p>{test && test.topic}</p>
      <h3>Show Passed Message?</h3>
      <p>{test && test.noteToPass}</p>
      <h3>Show Answer at the End?</h3>
      <p>{test && test.showAnswer}</p>
      <h3>Passed Messaged:</h3>
      <p>{test && test.textSucceeded}</p>
      <h3>Failed Message:</h3>
      <p>{test && test.textFailed}</p>
      <h3>Test Time:</h3>
      <p>{test && test.time}</p>
      <br />
      <Link to="/all-tests">
        <button className={classes.item}>Go Back</button>
      </Link>
    </div>
  );
};

export default ViewTest;

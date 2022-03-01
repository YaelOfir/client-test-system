import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import classes from "./Questions.module.css"
const ViewQuestion = () => {
  const [question, setQuestion] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleQuestion(id);
    }
  }, [id]);

  const getSingleQuestion = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/question/question/${id}`
    );
    if (response.status === 200) {
      setQuestion({ ...response.data[0] });
    }
  };

  return (
    <div className={classes.content}>
      <h3>Question Id:</h3>
      <p>{id}</p>
      <h3>Tags:</h3>
      <p>{question && question.tags}</p>
      <h3>Question:</h3>
      <p>{question && question.title}</p>
      <h3>Description:</h3>
      <p>{question && question.description}</p>
      <h3>Answer:</h3>
      <p>{question && question.answers}</p>
      <Link to="/Question">
        <button className={classes.item}>Go Back</button>
      </Link>
    </div>
  );
};

export default ViewQuestion;

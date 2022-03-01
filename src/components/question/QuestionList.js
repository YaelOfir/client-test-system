import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import classes from "./Questions.module.css";

function Question(props) {
  const [search, setSearch] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const getData = useEffect((item) => {
    axios
      .get("http://localhost:5000/question/question/list")
      .then((response) => {
        setQuestionList(response.data);
      });
  }, []);
  return (
    <div>
      <td>
        <Link to={`/add`}>
          <button className={classes.actions}>Add Question</button>
        </Link>
      </td>

      <input
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div>
        <div>
          {questionList
            .filter((item) => {
              if (search == "") {
                return item;
              } else if (
                item.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <div className={classes.item}>
                  <QuestionCard key={index}>
                    <div className={classes.content}>
                      <h3>Title: {item.title}</h3>
                      <h4>Id: {index + 1}</h4>
                      <p>Question: {item.description}</p>
                      <p>{item.datetime}</p>
                    </div>
                    <div className={classes.actions}>
                      <Link to={`/editQuestion/${item.id}`}>
                        <button>Edit</button>
                      </Link>
                      <Link to={`/qview/${item.id}`}>
                        <button>View</button>
                      </Link>
                    </div>
                  </QuestionCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Question;

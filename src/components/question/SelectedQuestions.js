import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Questions.module.css";
const QLIST = (props) => {
  const [questionList, setQuestionList] = useState([]);
  const [selectedQ, setSelectedQ] = useState([]);

  const getData = useEffect((item) => {
    axios
      .get("http://localhost:5000/question/question/list")
      .then((response) => {
        setQuestionList(response.data);
      });
  }, []);
  const isButtonSelected = (value) => {
    if (questionList === value) {
      return true;
    }
  };

  const handleChange = (e) => {
    if (selectedQ.includes(e.target.value)) {
      return;
    } else {
      let tmp = selectedQ;
      tmp.push(e.target.value);
    
      setSelectedQ(tmp);
      props.handleList(tmp);
    }
  };

  return (
    <div>
      <div>
        <div>
          {questionList.map((item) => {

            return (
              <td className={classes.content}>
                <input
                  type="radio"
                  key={item.id}
                  className={classes.item}
                  value={item.id}
                  onChange={handleChange}
                  checked={isButtonSelected("")}
                />
                {item.title}
                {item.id}
              </td>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QLIST;

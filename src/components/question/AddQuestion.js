import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import classes from "./Questions.module.css"
function Add(props) {
  const initialState = {
    title: "",
    description: "",
    answer: "",
    topic: "",
    tags: "",
  };
  const [questionState, setQuestionState] = useState(initialState);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getQuestionId(id);
    }
  }, [id]);

  const getQuestionId = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/question/question/${id}`
    );
    if (response.status === 200) {
      setQuestionState(...response.data[0]);
    }
  };

  const editQuestion = async (data, id) => {
    const response = await axios.put(
      `http://localhost:5000/question/editQuestion/${id}`,
      data
    );
    if (response.status === 200) {
      console.log(response.data);
    }
  };
  const history = useHistory();

  const addQuestion = async (data) => {
    await axios
      .post("http://localhost:5000/question/question/add", data)
      .then((response) => {
        setQuestionState(response.data);
      });
  };

  const handlerInputChange = (e) => {
    const datetime = format(new Date(), "dd/MM/yyy");
    console.log(e.target.name);
    //const datetime = format(new Date(), "dd/MM/yyy");
    setQuestionState({
      ...questionState,
      datetime,
      //datetime,
      [e.target.name]: e.target.value,
    });
  };

  ////handle

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      addQuestion(questionState);
    } else {
      editQuestion(questionState, id);
    }
    // if (!Title) {
    // alert("aaa");
    // } else {
    setTimeout(() => history.push("/Question"), 500);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create a Question</h3>
        <input
          className={classes.content}
          type="text"
          id="title"
          name="title"
          placeholder="Enter Title..."
          onChange={handlerInputChange}
        />
        <br />

        <input
          className={classes.content}
          type="text"
          id="description"
          name="description"
          placeholder="Enter Descrition..."
          onChange={handlerInputChange}
        />
        <br />

        <input
          className={classes.content}
          type="text"
          id="answers"
          name="answers"
          placeholder="Enter Answer..."
          onChange={handlerInputChange}
        />
        <br />

        <input
          className={classes.content}
          type="text"
          id="topic"
          name="topic"
          placeholder="Enter Topic..."
          onChange={handlerInputChange}
        />
        <br />

        <input
          className={classes.content}
          type="text"
          id="tags"
          name="tags"
          placeholder="Enter Tags..."
          onChange={handlerInputChange}
        />
        <br />
        <Link to={"/Question"}>
           <button className={classes.item}>Go back</button>
        </Link>

        <input type="submit" value={id ? "Edit" : "Add"} />
      </form>
    </div>
  );
}

export default Add;

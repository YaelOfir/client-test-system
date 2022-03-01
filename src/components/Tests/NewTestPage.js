import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import classes from "../testHelpers/NewTest.module.css";
import { Link } from "react-router-dom";
import Qlist from "../question/SelectedQuestions";
import { format } from "date-fns";

function NewTestPage() {
  const initialState = {
    title: "",
    topic: "",
    questions: [],
    noteToPass: "",
    showAnswer: "",
    textSucceeded: "",
    textFailed: "",
    time: "",
  };

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getTestId(id);
    }
  }, [id]);
  const [testState, setTestState] = useState(initialState);
  const [selected, setSelected] = useState([]);

  const [questionList, setQuestionList] = useState([]);

  const handleRadio = (e) => {
    setSelected(JSON.parse(e.target.value));
    console.log(selected);
  };

  const getTestId = async (id) => {
    const response = await axios.get(`http://localhost:5000/test/test/${id}`);
    if (response.status === 200) {
      setTestState(...response.data[0]);
    }
  };

  const setSelectedQuestion = (item) => {
    setSelected(item);
  };

  const editTest = async (data, id) => {
    const response = await axios.put(
      `http://localhost:5000/test/editTest/${id}`,
      data
    );
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  const getData = useEffect(() => {
    axios
      .get("http://localhost:5000/question/question/list")
      .then((response) => {
        setQuestionList(response.data);
      });
  }, []);

  const addTest = async (data) => {
    console.log(data);
    await axios
      .post("http://localhost:5000/test/test/add", data)
      .then((response) => {
        setTestState(response.data);
      });
  };

  const handlerInputChange = (e) => {
    const datetime = format(new Date(), "dd/MM/yyy");
    setTestState({
      ...testState,
      datetime,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionsToSend = selected.map((questionId) => {
      return questionList.find((q) => q.id === questionId);
    });
    console.log(questionList);

    const newTestState = { ...testState, questions: questionsToSend };

    setTestState(newTestState);
    if (!id) {
      addTest(newTestState);
    } else {
      console.log(testState);
      editTest(newTestState, id);
    }
    setTimeout(() => history.push("/all-tests"), 500);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h1>Create a new Test</h1>
        <div className={classes.content}>
          <h3 className={classes.control}> Test Title</h3>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}>Topic</h3>
          <input name="topic" id="topic" onChange={handlerInputChange} />
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}>Show Passing Grade?</h3>
          <input
            placeholder="Enter yes or no"
            name="noteToPass"
            id="noteToPass"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}>Show Answer at the End?</h3>
          <input
            placeholder="Enter yes or no"
            name="showAnswer"
            id="showAnswer"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.control}>
          <h3 className={classes.control}>Passed Message</h3>
          <input
            name="textSucceeded"
            id="textSucceeded"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.control}>
          <h3 className={classes.control}>Failed Message</h3>
          <input
            name="textFailed"
            id="textFailed"
            onChange={handlerInputChange}
          />
        </div>
        <div className={classes.content}>
          <h3 className={classes.control}>Test Time</h3>
          <input
            name="time"
            type="time"
            id="time"
            onChange={handlerInputChange}
          />
        </div>
        <Qlist
          questionList={questionList}
          id="questions"
          onChange={handleRadio}
          handleList={setSelectedQuestion}
        />
        <br />
        <input type="submit" value={id ? "Edit" : "Add"} />
        <br />
        <Link to="/all-tests">
          <button className={classes.actions}>All Tests</button>
        </Link>
      </form>
    </div>
  );
}

export default NewTestPage;

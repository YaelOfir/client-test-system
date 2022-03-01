import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TestCard from "../ui/TestCard";
import classes from "../testHelpers/Test.module.css";
function AllTests(props) {
  const [testList, setTestList] = useState([]);
  const [search, setSearch] = useState([]);

  const editTest = (studentObject) => {
    axios
      .put("http://localhost:5000/test/editTest/" + testList.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          alert("Test successfully updated");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const getData = useEffect(() => {
    axios.get("http://localhost:5000/test/list").then((response) => {
      setTestList(response.data);
    });
  }, []);

  return (
    <div>
      <td>
        <Link to={`/new-test`}>
          <button className={classes.actions}>Add Test</button>
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
          {testList
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
                  <TestCard key={index}>
                    <div className={classes.content}>
                      <h3>Test: {item.title}</h3>
                      <h4>Id: {item.id}</h4>
                      <p>Topic: {item.topic}</p>
                      <p>NoteToPass: {item.noteToPass}</p>
                      <p>showAnswer: {item.showAnswer}</p>
                    </div>
                    <div className={classes.actions}>
                      <Link to={`/view/${item.id}`}>
                        <button>View</button>
                      </Link>
                      <Link to={`/editTest/${item.id}`}>
                        <button>Edit</button>
                      </Link>
                    </div>
                  </TestCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AllTests;

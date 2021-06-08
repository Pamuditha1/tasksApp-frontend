import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import Footer from "./Footer";
import TasksList from "./TasksList";
import CategoryButtons from "./CategoryButtons";

function Tasks(props) {
  const [userID, setuserID] = useState("");
  const [usern, setusern] = useState("");
  useEffect(() => {
    document.title = "Tasks App";
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setusern(jwtDecode(jwt).name);
      setuserID(jwtDecode(jwt)._id);
    } else {
      setusern(" ");
      toast.error(`User not Logged In`);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
    toast.dark("Logged Out Successfully");
  };

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);
  const [activeTasks, setactiveTasks] = useState([]);
  const [newItem, setnewItem] = useState("");

  useEffect(() => {
    function fetchTasks() {
      axios
        .get(`http://localhost:3004/${userID}`)
        .then((res) => {
          setTasks(res.data);
          return res.data;
        })
        .then((data) => {
          let active = data.filter((t) => {
            if (t.status == "Active") return true;
          });
          setactiveTasks(active);
          return data;
        })
        .then((data) => {
          let completed = data.filter((t) => {
            if (t.status == "Completed") return true;
          });
          setcompletedTasks(completed);
        });
    }
    fetchTasks();
  }, []);

  const resetList = (newList) => {
    setTasks(newList);

    let active = newList.filter((t) => {
      if (t.status == "Active") return true;
    });
    setactiveTasks(active);

    let completed = newList.filter((t) => {
      if (t.status == "Completed") return true;
    });
    setcompletedTasks(completed);
  };

  const onChange = (e) => {
    setnewItem(e.target.value);
  };

  const addToList = (e) => {
    if (e.key === "Enter") {
      axios
        .post("http://localhost:3004/add-task", {
          task: newItem,
          status: "Created",
          user: userID,
        })
        .then((r) => {
          resetList(r.data.r);
          // setTasks([...tasks, { task: newItem, status: "Created" }]);
          toast.success(`${r.data.msg}`);
        });
      // .catch((e) => {
      //   toast.error(`${e.data.msg}`);
      // });
      setnewItem("");
    }
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-2">
          <strong>User : {usern}</strong>
        </div>
        <div className="col-2">
          {userID ? (
            <button className="btn btn-outline-dark" onClick={logout}>
              Log Out
            </button>
          ) : (
            <button className="btn btn-outline-dark" onClick={logout}>
              Log In
            </button>
          )}
        </div>
      </div>
      {userID ? (
        <>
          <input
            value={newItem}
            className="form-control mb-5 mt-5"
            onChange={onChange}
            onKeyDown={addToList}
            placeholder="Add task..."
          />
          <Switch>
            <Route
              path="/app/active"
              render={(props) => (
                <TasksList
                  category="Active Tasks"
                  list={activeTasks}
                  resetList={resetList}
                  {...props}
                />
              )}
            />
            <Route
              path="/app/completed"
              render={(props) => (
                <TasksList
                  category="Completed Tasks"
                  list={completedTasks}
                  resetList={resetList}
                  {...props}
                />
              )}
            />
            <Route
              path="/app"
              render={(props) => (
                <TasksList
                  category="All Tasks"
                  list={tasks}
                  resetList={resetList}
                  {...props}
                />
              )}
            />
          </Switch>
        </>
      ) : (
        <div class="alert alert-warning mt-3" role="alert">
          Please Log In to Create Tasks
        </div>
      )}
      <CategoryButtons />
      <Footer count={activeTasks.length} />
    </div>
  );
}

export default Tasks;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

function TasksList({ list, category, resetList }) {
  const [selected, setselected] = useState([]);
  const [allChecked, setallChecked] = useState(false);

  const jwt = localStorage.getItem("token");
  let userID = jwtDecode(jwt)._id;

  const changeStatusToCompleted = (id) => {
    axios
      .put(`http://localhost:3004/update-task/${userID}`, {
        id: id,
        status: "Completed",
      })
      .then((r) => {
        toast.warn(`${r.data.msg}`);
        resetList(r.data.r);
      });
  };

  const changeStatusToActive = (id) => {
    axios
      .put(`http://localhost:3004/update-task/${userID}`, {
        id: id,
        status: "Active",
      })
      .then((r) => {
        toast.warn(`${r.data.msg}`);
        resetList(r.data.r);
      });
  };

  const handleAllCheck = () => {
    if (selected.length == list.length) {
      setselected([]);
      setallChecked(false);
    } else {
      setselected(list);
      setallChecked(true);
    }
  };

  const handleCheck = (id) => {
    let checked = selected;
    if (checked.includes(id)) {
      let filtered = checked.filter((i) => {
        if (i != id) return true;
      });
      setselected(filtered);
    } else if (selected.length == 0) {
      setselected([id]);
    } else {
      setselected([...selected, id]);
    }
    console.log(selected);
  };

  const markSelectedActive = () => {
    selected.forEach((id) => {
      axios
        .put(`http://localhost:3004/update-task/${userID}`, {
          id: id,
          status: "Active",
        })
        .then((r) => {
          toast.warn(`${r.data.msg}`);
          resetList(r.data.r);
        });
    });
    setselected([]);
  };

  const markSelectedCompleted = () => {
    selected.forEach((id) => {
      axios
        .put(`http://localhost:3004/update-task/${userID}`, {
          id: id,
          status: "Completed",
        })
        .then((r) => {
          toast.warn(`${r.data.msg}`);
          resetList(r.data.r);
        });
    });
    setselected([]);
  };
  return (
    <div>
      <div className="row mb-3">
        <div className="col-12 mb-2">
          <h3>{category}</h3>
        </div>

        <>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={markSelectedActive}
              name="complete"
              disabled={selected == 0}
            >
              Mark as Active
            </button>
          </div>
          <div className="col-2">
            <button
              className="btn btn-success"
              onClick={markSelectedCompleted}
              name="complete"
              disabled={selected == 0}
            >
              Mark as Completed
            </button>
          </div>
        </>
      </div>
      <div className="row mb-2">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={handleAllCheck}
          className="col-1"
        />
        <div className="col-11 mb-2">Select All</div>
      </div>
      {list.map((i) => {
        return (
          <div className="row mb-2" key={i._id}>
            <input
              type="checkbox"
              checked={selected.includes(i._id) || allChecked}
              onChange={() => handleCheck(i._id)}
              className="col-1"
            />
            <div className="col-1">
              <button
                className="btn btn-success"
                onClick={() => changeStatusToCompleted(i._id)}
                name="complete"
              >
                Complete
              </button>
            </div>
            <div className="col-1">
              <button
                className="btn btn-primary"
                onClick={() => changeStatusToActive(i._id)}
                name="active"
              >
                Active
              </button>
            </div>
            <div className="col-2">
              <h6>{i.status == "Created" ? "" : `${i.status}`} </h6>
            </div>
            <div className="col-5" style={{ textAlign: "left" }}>
              <h6>{i.task}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TasksList;

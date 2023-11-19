import React from "react";
import { MdDelete } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import "../App.css";
import axios from "axios";
import { baseURL } from "../utils/constant";

function ToDo({ text, id, setUpdateUI, setShowPopup, setPopupContent }) {
  const todelete = () => {
    axios.delete(`${baseURL}/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const toUpdate = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };
  return (
    <>
      <div className="toDo">
        {text}
        <div className="icons">
          <LuFileEdit className="icon" onClick={toUpdate} />
          <MdDelete className="icon" onClick={todelete} />
        </div>
      </div>
    </>
  );
}

export default ToDo;

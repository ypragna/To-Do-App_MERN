import { useState, useEffect } from "react";
import axios from "axios";
import ToDo from "./components/ToDo";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import "./App.css";
function App() {
  const [input, setInput] = useState("");
  const [toDo, setToDo] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((res) => setToDo(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}`, { task: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container">
        <div className="title">To-Do-List</div>
        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>
        <div className="list">
          {toDo.map((el) => (
            <ToDo
              key={el._id}
              text={el.task}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </>
  );
}

export default App;

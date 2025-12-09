import { use, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Todo_list from "./components/TodoList.jsx";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

function App() {  
  const [inp, setInp] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("Low");


  useEffect(() => {
    const server = async () => {
      const serverData = await axios.get(BackendURL);
      setTodo(serverData.data);
    };
    server();
  }, []);

  const handleClick = () => {
    if (inp === "") return;

    if (editId !== null) {
      const updatedTodo = [...todo];
      updatedTodo[editId].text = inp;
      updatedTodo[editId].priority = selectedPriority;
      setTodo(updatedTodo);
      setEditId(null);
      handlePutData(updatedTodo[editId]._id, inp);
      setInp("");
      return;
    }

    const newTodo = {
      _id: crypto.randomUUID(),
      text: inp,
      priority: selectedPriority,
    };

    handlePostData(newTodo);

    setTodo([...todo, newTodo]);
    setInp("");
  };

  const handlePostData = (newTodo) => {
    axios.post(BackendURL, newTodo);
  };

  const handlePutData = async (_id, text) => {
    try {
      const res = await axios.put(`${BackendURL}/${_id}`, {
        text,
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = (_id) => {
    const server = async () => {
      try {
        await axios.delete(`${BackendURL}/${_id}`);
        setTodo(todo.filter((item) => item._id !== _id));
      } catch (error) {
        console.log("Delete error:", error);
      }
    };
    server();
  };

  const handleEdit = (id) => {
    let selectedTodo = todo.findIndex((item) => item._id === id);
    console.log('selected todo',todo[selectedTodo].priority = selectedPriority);
    setInp(todo[selectedTodo].text);
    setEditId(selectedTodo);
  };

  return (
    <>
      <div className="main_div">
        <h1>Todo List App</h1>
        <div>
          <input
            type="text"
            name="input"
            placeholder="Enter your text..."
            id="inp"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            className="todo_inp"
          />
          <button className="add_btn" onClick={handleClick}>
            Add
          </button>
        </div>

        {/* Priority section */}

        <div className="priority_div">
          <label>
            <input
              type="radio"
              name="priority"
              id="high"
              value="High"
              onChange={(e) => setSelectedPriority(e.target.value)}
            />{" "}
            High
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              id="Medium"
              value="Medium"
              onChange={(e) => setSelectedPriority(e.target.value)}
            />{" "}
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              id="Low"
              value="Low"
              checked={selectedPriority === "Low"}
              onChange={(e) => setSelectedPriority(e.target.value)}
            />{" "}
            Low
          </label>
        </div>

        {/* ToDO List Section */}

        <div className="todo_list">
          <div className="high_priority">
            <h2>High Priority</h2>
            {/* Render high priority todos here if needed */}
            {todo.length > 0
              ? todo
                  .filter((item) => item.priority === "High")
                  .map((item, index) => (
                      <Todo_list 
                        item={item} 
                        index={index} 
                        key={item._id} 
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                  ))
              : []}
          </div>
          <div className="medium_priority">
            <h2>Medium Priority</h2>
            {todo.length > 0
              ? todo
                  .filter((item) => item.priority === "Medium")
                  .map((item, index) => (
                    <Todo_list 
                        item={item} 
                        index={index} 
                        key={item._id} 
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                  ))
              : []}
          </div>
          <div className="low_priority">
            <h2>Low Priority</h2>
            {todo.length > 0
              ? todo
                  .filter((item) => item.priority === "Low")
                  .map((item, index) => (
                    <Todo_list 
                        item={item} 
                        index={index} 
                        key={item._id} 
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                  ))
              : []}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

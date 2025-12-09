import React from "react";
import "../App.css";

export default function Todo_list({item,index,handleEdit,handleDelete}) {
  return (
    <>
      <div key={index} className="todo_item">
        <h3>{item.text}</h3>
        <div>
          <button className="edit_btn" onClick={() => handleEdit(item._id)}>
            edit
          </button>
          <button className="delet_btn" onClick={() => handleDelete(item._id)}>
            Del
          </button>
        </div>
      </div>
    </>
  );
}

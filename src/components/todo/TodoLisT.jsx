import  { useState, useEffect } from "react";
import axios from "axios";
import scss from './TodoList.module.scss'

const Url = "https://api.elchocrud.pro/api/v1/904ccd5664032df5b5f8b2bc1ec829b5/todolist";

const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedItemId, setEditedItemId] = useState("");
	
 const [titleVlue , setTitleValue]= useState('');
 const [imageVlue , setImageValue]= useState('');
 const [descriptionValue , setDescriptionValue]= useState('');

  const handleAdd = async () => {
    const newData = {
      title: title,
      image: image,
      description: description,
    };
    const response = await axios.post(Url, newData);
    setTodo(response.data);
    setTitle("");
    setImage("");
    setDescription("");
  };

  const getTodos = async () => {
    const response = await axios.get(Url);
    setTodo(response.data);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`${Url}/${id}`);
    setTodo(response.data);
  };

  const updateTodoValue = (id) => {
    const filterData = todo.find((item) => item._id === id);
    setEditedItemId(id);
    setTitle(filterData.title);
    setImage(filterData.image);
    setDescription(filterData.description);
  };

 const deleteOlButton = async()=>{
  const res = await axios.delete(Url)
  setTodo(res.data)
 }
  const updateTodo = async () => {
    const updatedData = {
      title: titleVlue,
      image: imageVlue,
      description: descriptionValue,
    };
    const response = await axios.put(`${Url}/${editedItemId}`, updatedData);
    setTodo(response.data);
    setIsEdit(false);
    setTitle("");
    setImage("");
    setDescription("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={scss.container}>
        <h1 className={scss.mufa}>TodoList</h1>
        
        <input className={scss.inputs1}
          type="text"
          placeholder="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      
        <input className={scss.inputs2}
          type="url"
          placeholder="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        
        <input className={scss.inputs3}
          type="text"
          placeholder="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button className={scss.btn} onClick={handleAdd}>Add</button>
        <button  className={scss.btn2} onClick={deleteOlButton}>Delete OL </button>

      {todo.map((item) => (
        <div key={item._id} className={scss.card}>
          {isEdit && editedItemId === item._id ? (
            <div >
                <input className={scss.input1}
                  type="text"
                  placeholder="text"
                  value={titleVlue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
                <br />
                <br />
                <input className={scss.input2}
                  type="url"
                  placeholder="image"
                  value={imageVlue}
                  onChange={(e) => setImageValue(e.target.value)}
                />
                <br />
                <br />
                <input className={scss.input3}
                  type="text"
                  placeholder="title"
                  value={descriptionValue }
                  onChange={(e) => setDescriptionValue(e.target.value)}
                />
                <br />
                <br />
                <button className={scss.button1} onClick={handleAdd}>Add</button>
                <button className={scss.button2} onClick={updateTodo}>Save</button>
            </div>
          ) : (
            <div className={scss.cont}>
              <h1 className={scss.text}>{item.title}</h1>
              <img className={scss.image} src={item.image} alt={item.title} />
              <p>{item.description}</p>
            </div>
          )}
          <div className={scss.crd}>
          <button className={scss.buttons1}
            onClick={() => {
              deleteTodo(item._id);
            }}
          >
            Delete
          </button>
          <button className={scss.buttons2}
            onClick={() => {
              setIsEdit(!isEdit);
              updateTodoValue(item._id);
            }}
          >
            Edit
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

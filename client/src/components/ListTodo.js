import { Fragment, useEffect, useState } from "react"
import React from 'react'
import EditTodo from "./EditTodo";

const ListTodo = () => {

  const [todos, setTodos] = useState([]);

  const deleteTodo = async(id)=>{
    try {
      const deleteTodo = await fetch(`/todos/${id}`,{
        method: 'DELETE'
      });
      console.log(deleteTodo);
      setTodos(todos.filter(todo=>todo.todo_id!==id));
    } catch (error) {
      console.error(error.message);
    }
  }

  const getTodos = async()=>{
    try {
      const response = await fetch("/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(()=>{
    getTodos();
  },[]);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {todos.map(todo=>(
          <tr key = {todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo = {todo}/></td>
            <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
          </tr>
        ))}
        <tbody>
          
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListTodo

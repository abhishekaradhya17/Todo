import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTodos=async()=>{
    const response=await axios.get('/api/getTodos/?page='+page);
    setTodos(response.data);
  }
  const deleteTodo=async(id)=>{
    const confirmEvent=confirm('Arue you sure')
    if(confirmEvent){
      const result=await axios.get('/api/deleteTodo/'+id)
      if(result){
        fetchTodos()
      }
      
    }
  }
  useEffect(()=>{
    fetchTodos()
  },[page]);

  const paginatePage=async(link)=>{
    const url=new URL(link);
    console.log(url.searchParams.gat('page'));
    setPage(url.searchParams.get('page'))
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="h3">Display Todos</div>
        <Link to='/create ' className='btn btn-primary'>Add</Link>
      </div>
      <div className='table-responsive'>
        <table className="table table-striped">
          <thead className='table-primary'>
            <tr>
              <th>Sr.No</th>
              <th>Task</th>
              <th>Desc</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
            todos.data?.map((todo,index)=>(
              <tr className='aligne-middle'>
              <td>{index+1}</td>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>{todo.date_time}</td>
              <td>
                <Link to={'/edit/'+todo.id} className='btn btn-success m-2'>Edit</Link>
                <a href='' onClick={()=>deleteTodo(todo.id)} className='btn btn-danger'>Del</a>
              </td>
            </tr>
            ))
          }
            
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            {
              todos.links?.map(link=>(
                
                <li onClick={()=>paginatePage(link.url)} style={{cursor:'pointer'}} className={`page-item ${link.active ?  "active" : "" }`}><a className="page-link">{link.label.replace('&laquo;','<<').replace('&raquo;','>>')}</a></li>
              ))
            }
          </ul>
        </nav>
        </div>
      </div>
    </div>
  )
}

export default Tasks;
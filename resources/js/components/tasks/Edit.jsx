import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom';

export const Edit = () => {
  const {todoId}=useParams();
  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [date,setDate]=useState("");
  const navigate=useNavigate();

  const fetchTodo=async()=>{
    const response=await axios.get('/api/getTodo/'+todoId)
    setName(response.data.name)
    setDesc(response.data.description)
    setDate(response.data.date_time)
  }

  useEffect(()=>{
    fetchTodo()
  }, []);

  const updateTodo=async()=>{
    const details={
      todoId,
      name,
      desc,
      date
    }
    const result=await axios.post('/api/updateTodo',details);
    if(result){
      navigate('/')
    }
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="h3">Edit Todo</div>
        <Link to='/ ' className='btn btn-primary'>Back</Link>
      </div>
      <div className="card mt-5">
        <div className="card-body p-5">
        <div className="row pt-3">
          <div className="col-lg-4">
            <input type="text" className='form-control' placeholder='Todo Name' onChange={(e)=>setName(e.target.value)} value={name}/>
          </div>
          <div className="col-lg-4">
            <input type="text" className='form-control'placeholder='Todo Description' onChange={(e)=>setDesc(e.target.value)} value={desc}/>
          </div>
          <div className="col-lg-4">
            <input type="datetime-local" className='form-control' onChange={(e)=>setDate(e.target.value)} value={date} />
            </div>
          </div>
          <div className="text-center mt-4">
            <input type="button" onClick={(e)=>updateTodo()} className='btn btn-primary' value="update" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;
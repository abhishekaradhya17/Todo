import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Create = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const navigate=useNavigate();


  const createTodo=async(e)=>{
    e.preventDefault();
    const data={
      name,
      desc,
      date
    };
    axios.post('/api/createTodo',data)
    .then(response=>{
      if(response){
        navigate('/');
      }else{
        alert("Something is wrong")
      }
    });
  }
  return (
      <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="h3">Create Todo</div>
        <Link to='/ ' className='btn btn-primary'>Back</Link>
      </div>

      <form onSubmit={(e)=>createTodo(e)}>
      <div className="card mt-5">
        <div className="card-body p-5">
        <div className="row pt-3">
          <div className="col-lg-4">
            <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)} placeholder='Todo Name' />
          </div>
          <div className="col-lg-4">
            <input type="text" className='form-control' onChange={(e)=>setDesc(e.target.value)} placeholder='Todo Description'/>
          </div>
          <div className="col-lg-4">
            <input type="datetime-local"onChange={(e)=>setDate(e.target.value)} className='form-control' />
            </div>
          </div>
          <div className="text-center mt-4">
            <input type="submit" className='btn btn-primary' value="submit" />
          </div>
        </div>
      </div>
      </form>
    </div>
    
  )
}

export default Create;
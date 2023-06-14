import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditEmployee() {
    let navigate = useNavigate();
    const {id} = useParams();
    const [employee,setEmployee] = useState({
        name:'',
        email:'',
        department:''
    })
    const {name,email,department} = employee
    const onInputChange = (event) =>{
        setEmployee({
            ...employee, [event.target.name]:event.target.value
        })
    }
    useEffect(()=>{
        loadEmployees()
    }, []);
    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/editEmployee/${id}`,employee);
        navigate("/");
    }
    const loadEmployees = async () =>{
        const result = await axios.get(`http://localhost:8080/getEmployee/${id}`)
        setEmployee(result.data)
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h3 className='text-center m-3'>Add Employee</h3>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor='name'>Name</label>
                        <input type='text' className='form-control' placeholder='Enter your name'
                        value={name} onChange={onInputChange} name='name' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type='text' className='form-control' placeholder='Enter your email'
                        value={email} onChange={onInputChange} name='email' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor='department'>Department</label>
                        <input type='text' className='form-control' value={department} onChange={onInputChange}
                        placeholder='Enter your department' name='department' />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

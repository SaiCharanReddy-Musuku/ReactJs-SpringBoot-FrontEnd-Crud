import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams} from 'react-router-dom'

export default function DisplayEmployee() {
    const [employee,setEmployee] = useState({
        name:"",
        email:"",
        department:""
    })
    const {id} = useParams();
    useEffect(()=>{
        loadEmployees();
    }, [])
    const loadEmployees = async () =>{
        const result = await axios.get(`http://localhost:8080/getEmployee/${id}`);
        setEmployee(result.data)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h3 className='text-center m-3'>Employee Details</h3>
                    <div className='card'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {employee.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email: </b>
                                    {employee.email}
                                </li>
                                <li className='list-group-item'>
                                    <b>Department: </b>
                                    {employee.department}
                                </li>
                            </ul>
                    </div>
                    <Link className='btn btn-primary my-2' to='/'>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import './AddUser.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
  

const AddUser = () => {
    const navigate = useNavigate();

    const users = {
        name: "",
        email: "",
        address: ""
    };

    const [user, setUser] = useState(users);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        await axios.post(`${import.meta.env.VITE_BASE_URL}/user`, user)
        .then((response) => {
            navigate("/");
            // setUser(...users, response.data);
            console.log("User added successfully:", response.data);
            toast.success(response.data.message, { position: "top-right" });
            
            // Optionally, you can reset the form or navigate to another page
        })
        .catch((error) => {
            console.error("Error adding user:", error);
        });
    }               

  return (
    <div className='add-user'>
        <Link to="/" className="btn btn-outline-secondary"><i class="fa-solid fa-backward"></i>Back</Link>
        <h3>Add New User</h3>
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" onChange={inputHandler} name="name" autoComplete='off' placeholder='Enter name'  />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={inputHandler} name="email" autoComplete='off' placeholder='Enter email' />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" onChange={inputHandler} name="address" autoComplete='off' placeholder='Enter address' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddUser
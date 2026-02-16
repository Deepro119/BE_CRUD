import React from 'react'
import './User.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const User = () => {

    const [users, setUsers]=useState([])

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        }
        fetchData();
    },[])

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/user/${id}`)
            .then((response)=>{
                console.log("User deleted successfully:", response.data);
                setUsers(users.filter((user) => user._id !== id)); // Update the state to remove the deleted user
                toast.success(response.data.message, { position: "top-right" });
            })
              
        } catch (error) {
            console.log("Error deleting user:", error);
        }
    }

  return (
    <div className='userTable'>
        <Link to="/add-user" type="button" class="btn btn-primary"><i class="fa-solid fa-user-plus"></i> Add User</Link>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>Sl. No.</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                
                {users.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className='actionButtons'>
                                <Link to={`/update-user/${user._id}`} type="button" class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i></Link>
                                <button type="button" class="btn btn-danger" onClick={() => deleteHandler(user._id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    );
                })}
                
            </tbody>

        </table>
    </div>
  )
}

export default User
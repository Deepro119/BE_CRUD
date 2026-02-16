import React from 'react'
import './update.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract the user ID from the URL params (assuming route like /update/:id)

    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        id: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        if (id) { // Optional: Ensure id exists before fetching
            fetchUserData();
        }
    }, [id]); // Depend on id to refetch if it changes (though unlikely in this component)

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        await axios.put(`${import.meta.env.VITE_BASE_URL}/update/user/${user._id}`, user)
        .then((response) => {
            navigate("/");
            console.log("User updated successfully:", response.data);
            toast.success(response.data.message, { position: "top-right" });
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    }

    return (
        <div className='update-user'>
            <Link to="/" className="btn btn-outline-secondary"><i class="fa-solid fa-backward"></i>Back</Link>
            <h3>Update User</h3>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={inputHandler} name="name" autoComplete='off' placeholder='Enter name' value={user.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={inputHandler} name="email" autoComplete='off' placeholder='Enter email' value={user.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" onChange={inputHandler} name="address" autoComplete='off' placeholder='Enter address' value={user.address} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Update
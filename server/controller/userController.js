import User from "../model/userModel.js";

//Create User
export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const {email} = newUser

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const savedData = await newUser.save();
        res.status(200).json({ message: "User created successfully", data: savedData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Get All Users
export const getAllUsers = async (req, res) => {
    try{
        const userData = await User.find();
        if(userData.length === 0 || !userData){
            return res.status(404).json({message: "No user data found"})
        }

        res.status(200).json(userData);
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}

//Get User by ID
export const getUserById = async (req, res) => {
    try {
        const id =req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            return res.status(404).json({message: "No user found"})
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

//Update User
export const updateUser = async (req,res) => {
    try {
        const id =req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            return res.status(404).json({message: "No user found"})
        }
        const updatedUser =await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

//Delete User
export const deleteUser = async (req,res) => {
    try {
        const id =req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            return res.status(404).json({message: "No user found"})
        }
        const deletedUser = await userData.deleteOne();
        res.status(200).json({ message: "User deleted successfully", data: deletedUser });
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}
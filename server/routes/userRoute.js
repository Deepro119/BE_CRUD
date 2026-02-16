import express from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser,} from '../controller/userController.js';
import { validateUserInput } from '../middlewares/user.middleware.js';

const route = express.Router();

route.post('/user',validateUserInput, createUser);
route.get('/users', getAllUsers);
route.get('/user/:id', getUserById);
route.put('/update/user/:id',validateUserInput, updateUser);
route.delete('/delete/user/:id', deleteUser);

export default route;
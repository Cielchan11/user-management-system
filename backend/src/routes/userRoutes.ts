import express from 'express';
import {
  getAllUsers,
  createUser,
//   updateUser,
//   deleteUser
} from '../controllers/userController';

const router = express.Router();

// Make sure these routes are correct
router.get('/users', getAllUsers);
router.post('/users', createUser);
// router.put('/users/:id', updateUser);  // This line might be causing issues
// router.delete('/users/:id', deleteUser); // This line might be causing issues

export default router;

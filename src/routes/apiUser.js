import express from 'express';
import userController from '../app/controllers/UserController';
const router = express.Router();

router.post('/login', userController.handleLogin);
router.get('/get-all-users', userController.handleGetAllUsers);
router.post('/create-user', userController.handleCreateUser);
router.put('/edit-user', userController.handleEditUser);
router.delete('/delete-user', userController.handleDeleteUser);

module.exports = router;
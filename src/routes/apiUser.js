import express from 'express';
import userController from '../app/controllers/UserController';
const router = express.Router();

router.post('/', userController.handleLogin);

module.exports = router;
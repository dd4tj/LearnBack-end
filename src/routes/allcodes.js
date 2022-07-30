import express from 'express';
import userController from '../app/controllers/UserController';
const router = express.Router();

router.get('/', userController.handleGetAllCodes);

module.exports = router;
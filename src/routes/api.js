import express from 'express';
import userController from '../app/controllers/UserController';
import doctorController from '../app/controllers/DoctorController';
const router = express.Router();

router.post('/login', userController.handleLogin);
//api user
router.get('/get-all-users', userController.handleGetAllUsers);
router.post('/create-user', userController.handleCreateUser);
router.put('/edit-user', userController.handleEditUser);
router.delete('/delete-user', userController.handleDeleteUser);
//api allcodes
router.get('/get-allcodes', userController.handleGetAllCodes);
// api doctor
router.get('/top-doctor-home', doctorController.handleTopDoctorHome);
router.get('/get-all-doctors', doctorController.handleGetAllDoctors);
router.post('/save-info-doctor', doctorController.handlePostInfoDoctor);
router.get('/get-info-doctor-by-id', doctorController.handleGetInfoDoctorById);

module.exports = router;
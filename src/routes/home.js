import express from 'express';
import homeController from '../app/controllers/HomeController';
const router = express.Router();

router.get('/', homeController.getHomePage);
router.get('/create', homeController.getCreatePage);
router.post('/create-user', homeController.createUser);
router.get('/edit-user-page', homeController.editUserPage);

//FIXME: put, delete
router.post('/put-user', homeController.putUser);
router.get('/delete-user', homeController.deleteUser);

module.exports = router;

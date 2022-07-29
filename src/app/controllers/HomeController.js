// import db from '../../models/index';
// import user from '../../models/user';
import CRUDService from '../../services/CRUDService';

class HomeController {
   // show all users
   getHomePage = async (req, res) => {
      let data = await CRUDService.getAllUsers();
      // console.log(data);
      return res.render('homePage.ejs', { dataTable: data });
   }

   getCreatePage(req, res) {
      return res.render('createPage.ejs');
   }

   createUser = async (req, res) => {
      let message = await CRUDService.createNewUser(req.body);
      console.log(message);
      return res.redirect('/');
   }

   editUserPage = async (req, res) => {
      let userId = req.query.id;
      if (userId) {
         let userData = await CRUDService.getUserDataById(userId);

         //check user data not found

        return res.render('editUserPage.ejs', { userData: userData });
      } else {
         return res.send('User not found!!!');
      }
   }

   //update user data
   putUser = async (req, res) => {
      let data = req.body;
      await CRUDService.updateUserData(data);
      return res.redirect('/');
   }

   deleteUser = async (req, res) => {
      let userId = req.query.id;
      await CRUDService.deleteUserData(userId);
      return res.redirect('/');
   }
}

module.exports = new HomeController();

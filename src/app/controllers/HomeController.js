import db from '../../models/index';
import user from '../../models/user';
import CRUDService from '../../services/CRUDService';

class HomeController {
   // show all users
   async getHomePage(req, res) {
      let data = await CRUDService.getAllUsers();
      // console.log(data);
      res.render('homePage.ejs', { dataTable: data });
   }

   getCreatePage(req, res) {
      res.render('createPage.ejs');
   }

   async createUser(req, res) {
      let message = await CRUDService.createNewUser(req.body);
      console.log(message);
      res.redirect('/');
   }

   async editUserPage(req, res) {
      let userId = req.query.id;
      if (userId) {
         let userData = await CRUDService.getUserDataById(userId);

         //check user data not found

         res.render('editUserPage.ejs', { userData: userData });
      } else {
         res.send('User not found!!!');
      }
   }

   //update user data
   async putUser(req, res) {
      let data = req.body;
      await CRUDService.updateUserData(data);
      res.redirect('/');
   }
}

module.exports = new HomeController();

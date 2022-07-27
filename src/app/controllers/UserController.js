import userService from '../../services/userService';

class UserController {
   async handleLogin(req, res, next) {
      let email = req.body.email;
      let password = req.body.password;
      if (!email || !password) {
         return res.status(500).json({
            errCode: 1,
            msg: 'Missing inputs parameters!!!'
         })
      }

      let userData = await userService.handleUserLogin(email, password);
      return res.status(200).json({
         errCode: userData.errCode,
         errMsg: userData.errMsg,
         user: userData.user ? userData.user : {}
      })
   }
};

module.exports = new UserController();
import bcrypt from 'bcrypt';
import db from '../models/index';


  function handleUserLogin(email, password) {
      return new Promise(async (resolve, reject) => {
         try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (!isExist) {
               userData.errCode = 1;
               userData.errMsg = 'Invalid email or password';
            } else {
               let user = await db.User.findOne({
                  where: { email: email },
                  attributes: ['email', 'roleId', 'password'],
                  raw: true
               });

               if (!user) {
                  userData.errCode = 2;
                  userData.errMsg = `User's not found!!!`;
               } else {
                  // compare password
                  let check = await bcrypt.compareSync(password, user.password);
                  if (!check) {
                     userData.errCode = 3;
                     userData.errMsg = 'Wrong email or password';
                  } else {
                     userData.errCode = 0;
                     userData.errMsg = '0k';

                     delete user.password;
                     userData.user = user;
                  }
               }
            }
            resolve(userData);
         } catch (e) {
            reject(e);
         }
      });
   }

   function checkUserEmail(email) {
      return new Promise(async (resolve, reject) => {
         try {
            let user = await db.User.findOne({ where: { email: email } });
            if (!user) {
               resolve(false);
            } else {
               resolve(true);
            }
         } catch (e) {
            reject(e);
         }
      });
   }


module.exports = {
   handleUserLogin,
   checkUserEmail
};

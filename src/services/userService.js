import bcrypt from 'bcrypt';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10); // thuật toán

let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			var hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

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
					raw: true,
				});

				if (!user) {
					userData.errCode = 2;
					userData.errMsg = `User's not found!!!`;
				} else {
					// compare password
					let check = await bcrypt.compare(password, user.password);
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

let getAllUsers = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = '';
			if (userId === 'ALL') {
				users = await db.User.findAll({
					// attributes: ['lastName', 'id', 'email', 'roleId'],
					attributes: {
						exclude: ['password'],
					},
					raw: true,
				});
			}
			if (userId && userId !== 'ALL') {
				users = await db.User.findOne({
					where: { id: userId },
					// attributes: ['lastName', 'id', 'email', 'roleId'],
					attributes: {
						exclude: ['password'],
					},
					raw: true,
				});
			}

			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

let createUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// check email isExist?
			let check = await checkUserEmail(data.email);
			if (check) {
				resolve({ errCode: 1, errMsg: 'Email is exist!!!' });
			} else {
				let hashPasswordFromBcrypt = await hashUserPassword(data.password);
				await db.User.create({
					email: data.email,
					password: hashPasswordFromBcrypt,
					firstName: data.firstName,
					lastName: data.lastName,
					address: data.address,
					phoneNumber: data.phoneNumber,
					gender: data.gender === '1' ? true : false,
					roleId: data.roleId,
				});

				resolve({
					errCode: 0,
					errMsg: 'Ok',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let deleteUser = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({ where: { id: userId }, raw: false }); // raw: false => not return object bổ trợ cho user.destroy() (lấy data lên nodejs xong xoá)
			console.log(user);
			if (!user) {
				resolve({
					errCode: 2,
					errMsg: 'User not found!!!',
				});
			} else {
				await user.destroy();
				resolve({ errCode: 0, errMsg: 'Delete completed!!!' });
			}
		} catch (e) {
			reject(e);
		}
	});
};

let editUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 2,
					errMsg: 'Missing required parameters!!!',
				});
			}
			let user = await db.User.findOne({ where: { id: data.id } });
			if (!user) {
				resolve({
					errCode: 1,
					errMsg: 'User not found!!!',
				});
			} else {
				await db.User.update(
					{
						firstName: data.firstName,
						lastName: data.lastName,
						address: data.address,
					},
					{ where: { id: data.id } }
				);
				resolve({
					errCode: 0,
					errMsg: 'User updated!!!',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getAllCodes = (typeInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!typeInput) {
				resolve({
					errCode: 2,
					errMsg: 'Missing required parameters!!!',
				});
			} else {
				let res = {};
				let allCodes = await db.Allcode.findAll({ where: { type: typeInput } });
				res.errCode = 0;
				res.data = allCodes;
				resolve(res);
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	handleUserLogin,
	checkUserEmail,
	getAllUsers,
	createUser,
	deleteUser,
	editUser,
	getAllCodes,
	// hashUserPassword,
};

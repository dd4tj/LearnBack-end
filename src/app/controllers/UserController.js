import userService from '../../services/userService';

class UserController {
	async handleLogin(req, res, next) {
		let email = req.body.email;
		let password = req.body.password;
		if (!email || !password) {
			return res.status(500).json({
				errCode: 1,
				msg: 'Missing inputs parameters!!!',
			});
		}

		let userData = await userService.handleUserLogin(email, password);
		return res.status(200).json({
			errCode: userData.errCode,
			errMsg: userData.errMsg,
			user: userData.user ? userData.user : {},
		});
	}

	handleGetAllUsers = async (req, res) => {
		let id = req.body.id; // ALL, id

		if (!id) {
			return res.status(200).json({
				errCode: 1,
				errMsg: 'Missing required parameters!!!',
				users: [],
			});
		}

		let users = await userService.getAllUsers(id);
		return res.status(200).json({
			errCode: 0,
			errMsg: '0k',
			users,
		});
	};

	handleCreateUser = async (req, res) => {
		let msg = await userService.createUser(req.body);
		console.log(msg);
		return res.status(200).json({
			errCode: msg.errCode,
			errMsg: msg.errMsg,
		});
	};

	handleDeleteUser = async (req, res) => {
		let id = req.body.id;
		if (!id) {
			return res.status(200).json({
				errCode: 1,
				errMsg: 'Missing required parameters!!!',
			});
		}

		let msg = await userService.deleteUser(id);
		return res.status(200).json(msg);
	};

	handleEditUser = async (req, res) => {
		let data = req.body;
		let msg = await userService.editUser(data);
		return res.status(200).json(msg);
	};

	handleGetAllCodes = async (req, res) => {
		try {
			let data = await userService.getAllCodes(req.query.type);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(200).json({
				errCode: -1,
				errMsg: 'Error from server!!!',
			});
		}
	};
}

module.exports = new UserController();

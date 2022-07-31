import db from '../models/index';

let getTopDoctorHome = limitInput => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = await db.User.findAll({
				where: { roleId: 'R2' },
				limit: limitInput,
				order: [['createdAt', 'DESC']],
				attributes: { exclude: ['password', 'image'] },
				include: [
					{
						model: db.Allcode,
						as: 'positionData',
						attributes: ['valueEn', 'valueVi'],
					},
					{
						model: db.Allcode,
						as: 'genderData',
						attributes: ['valueEn', 'valueVi'],
					},
				],
				raw: true,
				nest: true,
			});
			resolve({
				errCode: 0,
				data: users,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllDoctors = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let doctors = await db.User.findAll({
				where: { roleId: 'R2' },
				attributes: { exclude: ['password', 'image'] },
			});
			resolve({
				errCode: 0,
				data: doctors,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let postDetailInfoDoctor = dataInput => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!dataInput.doctorId || !dataInput.contentHTML || !dataInput.contentMarkdown) {
				resolve({
					errCode: 1,
					errMsg: 'Missing required parameter!!!',
				});
			} else {
				await db.Markdown.create({
					contentHTML: dataInput.contentHTML,
					contentMarkdown: dataInput.contentMarkdown,
					description: dataInput.description,
					doctorId: dataInput.doctorId,
				});
				resolve({
					errCode: 0,
					errMsg: 'Save info success!!!',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getInfoDoctorById = id => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!id) {
				resolve({
					errCode: 1,
					errMsg: 'Missing required parameter!!!',
				});
			} else {
				let data = await db.User.findOne({
					where: { id: id },
					attributes: { exclude: ['password', 'image'] },
					include: [
						{ model: db.Markdown },
						{
							model: db.Allcode,
							as: 'positionData',
							attributes: ['valueEn', 'valueVi'],
						},
					],
					nest: true,
					raw: true,
				});
				if (!data) {
					resolve({
						errCode: 2,
						errMsg: 'Doctor not found!!!',
					});
				} else {
					resolve({
						errCode: 0,
						data: data,
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	getTopDoctorHome,
	getAllDoctors,
	postDetailInfoDoctor,
	getInfoDoctorById,
};

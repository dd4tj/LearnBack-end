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

module.exports = {
	getTopDoctorHome,
};

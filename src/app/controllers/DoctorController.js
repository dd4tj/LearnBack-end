import doctorService from '../../services/doctorService';

class DoctorController {
   handleTopDoctorHome = async (req, res) => {
      let limit = req.query.limit;
      if (!limit) {
         limit = 10;
      }
      try {
         // thêm dấu + trc chuỗi string để chuyển sang number
         let response = await doctorService.getTopDoctorHome(+limit);
         return res.status(200).json(response);
      } catch (e) {
         console.log(e);
         return res.status(200).json({
            errCode: -1,
            errMsg: 'Error from server!!!',
         });
      }
   }

   handleGetAllDoctors = async (req, res) => {
      try {
         let response = await doctorService.getAllDoctors();

         return res.status(200).json(response);
      } catch (e) {
         return res.status(200).json({
            errCode: -1,
            errMsg: 'Error from server!!!',
         });
      }
   }
}

module.exports = new DoctorController();
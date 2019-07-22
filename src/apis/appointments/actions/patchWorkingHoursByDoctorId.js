import { Doctor } from '../models';

/**
 * updates a doctor's working hours
 * @param {*} router
 */
export default function (router) {
  router.patch('/doctors/:id/working-days', async (req, res) => {
    try {
      const { id } = req.params;
      const { body: workingDays } = req;
      await Doctor.updateOne({
        _id: id
      }, {
        $set: {
          workingDays
        }
      });
      const doctor = await Doctor.findById(id);
      return res
        .status(200)
        .json(doctor.workingDays);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
}
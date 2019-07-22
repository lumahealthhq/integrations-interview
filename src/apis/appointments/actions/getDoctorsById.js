import { Doctor } from '../models'

/**
 * gets doctor by id
 * @param {*} router
 */
export default function (router) {
  router.get('/doctors/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findById(id);
      if (doctor === null) {
        return res
          .status(404)
          .json({});
      }
      return res
        .status(200)
        .json(doctor);
    } catch (err) {
      return res
        .status(500)
        .json(err);
    }
  })
}
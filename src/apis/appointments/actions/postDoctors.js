import { Doctor } from '../models'

/**
 * creates a doctor
 * @param {*} router
 */
export default function (router) {
  router.post('/doctors', async (req, res) => {
    try {
      const { body: input } = req;
      const doctor = await Doctor.create(input);
      return res
        .status(201)
        .json(doctor);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
}
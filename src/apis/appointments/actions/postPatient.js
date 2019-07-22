import { Patient } from '../models'

/**
 * creates a appointment
 * @param {*} router
 */
export default function (router) {
  router.post('/patients', async (req, res) => {
    try {
      const { body: input } = req;
      const patient = await Patient.create(input);
      return res
        .status(201)
        .json(patient);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
}
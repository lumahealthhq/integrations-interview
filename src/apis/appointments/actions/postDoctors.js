/**
 * creates a doctor
 * @param {*} router
 */
export default function (router) {
  router.post('/doctors', async (req, res) => {
    try {

      return res
        .status(201)
        .json({});

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
}
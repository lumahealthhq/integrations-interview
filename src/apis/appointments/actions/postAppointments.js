/**
 * creates a appointment
 * @param {*} router
 */
export default function (router) {
  router.post('/appointments', async (req, res) => {
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
/**
 * updates a doctor's working hours
 * @param {*} router
 */
export default function (router) {
  router.patch('/doctors/:id/working-days', async (req, res) => {
    try {
      
      return res
        .status(200)
        .json({});

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
}
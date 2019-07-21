import flat from 'flat';
import map from 'lodash/map';

/**
 * gets doctor by id
 * @param {*} router
 */
export default function (router) {
  router.get('/doctors/:id', async (req, res) => {
    try {
      return res
        .status(200)
        .json({});
    } catch (err) {
      return res
        .status(500)
        .json(err);
    }
  })
}
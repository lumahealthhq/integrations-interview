const db = require('../knex').knex

module.exports = (table) => {
  let module = {}

  module.get = (where) => {
    return db(table).select('*').where(where);
  }
  module.put = (where, data) => {
    return db(table).where(where).update(data);
  }
  module.post = (data) => {
    return db(table).insert(data);
  }
  module.destroy = (where) => {
    return db(table).where(where).del();
  }

  return module;
}
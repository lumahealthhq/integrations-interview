const knex = require('knex')(require('./knexfile'))

knex.raw('select 1+1 as result').asCallback((err, data) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } 
  console.log('Connected to DB');
});

module.exports = {
  knex
}
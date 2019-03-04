
exports.up = function(knex, Promise) {
  return knex.schema.createTable('appointments', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('doctor_id').notNull();
    t.integer('patient_id').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('appointments');
};

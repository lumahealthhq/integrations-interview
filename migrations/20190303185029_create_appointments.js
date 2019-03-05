
exports.up = function(knex, Promise) {
  return knex.schema.createTable('appointments', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('schedule_id').unsigned().index().references('id').inTable('schedule')
    t.integer('patient_id').unsigned().index().references('id').inTable('patients')
    t.unique(['schedule_id', 'patient_id'])
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('appointments');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('doctor_id').notNull();
    t.datetime('from').notNull();
    t.datetime('to').notNull();
    t.integer('status').notNull();
    t.unique(['doctor_id', 'from', 'to'])
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedule');
};

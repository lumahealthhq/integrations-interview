
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('doctor_id').notNull();
    t.date('date').notNull();
    t.time('from').notNull();
    t.time('to').notNull();
    t.integer('status').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedule');
};

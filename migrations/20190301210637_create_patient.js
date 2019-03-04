
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', function(t) {
    t.increments('id').unsigned().primary();
    t.string('name').notNull();
    
    // t.dateTime('createdAt').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    // t.dateTime('updatedAt').nullable().defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.uuid('id').notNullable();
    t.string('name').notNullable();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.timestamp('joined', { useTz: false }).notNullable();
    t.text('avatar');
    t.boolean('is_admin').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

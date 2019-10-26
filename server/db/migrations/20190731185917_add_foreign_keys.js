exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('tutorials', t => {
      t.foreign('user_id')
        .references('id')
        .inTable('users');
      t.foreign('instructor_id')
        .references('id')
        .inTable('instructors');
    }),
    knex.schema.alterTable('comments', t => {
      t.foreign('user_id')
        .references('id')
        .inTable('users');
      t.foreign('tutorial_id')
        .references('id')
        .inTable('tutorials');
    }),
    knex.schema.alterTable('tutorial_votes', t => {
      t.foreign('user_id')
        .references('id')
        .inTable('users');
      t.foreign('tutorial_id')
        .references('id')
        .inTable('tutorials');
    }),
    knex.schema.alterTable('comment_votes', t => {
      t.foreign('user_id')
        .references('id')
        .inTable('users');
      t.foreign('comment_id')
        .references('id')
        .inTable('comments');
    }),
    knex.schema.alterTable('favorites', t => {
      t.foreign('user_id')
        .references('id')
        .inTable('users');
      t.foreign('tutorial_id')
        .references('id')
        .inTable('tutorials');
    })
  ]);

  console.log('foreign keys added');
  resolve();
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tutorials', t => {
      t.dropForeign('user_id');
      t.dropForeign('instructor_id');
    }),
    knex.schema.table('comments', t => {
      t.dropForeign('user_id');
      t.dropForeign('tutorial_id');
    }),
    knex.schema.table('tutorial_votes', t => {
      t.dropForeign('user_id');
      t.dropForeign('tutorial_id');
    }),
    knex.schema.table('comment_votes', t => {
      t.dropForeign('user_id');
      t.dropForeign('comment_id');
    }),
    knex.schema.table('favorites', t => {
      t.dropForeign('user_id');
      t.dropForeign('tutorial_id');
    })
  ]);

  console.log('foreign keys dropped');
  resolve();
};

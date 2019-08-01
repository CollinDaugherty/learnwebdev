exports.up = function(knex, Promise) {
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all([
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
        knex.schema.alterTable('tutorials_categories', t => {
          t.foreign('tutorial_id')
            .references('id')
            .inTable('tutorials');
          t.foreign('category_id')
            .references('id')
            .inTable('categories');
        })
      ]);

      console.log('foreign keys added');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

exports.down = function(knex, Promise) {
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all([
        knex.schema.table('tutorials', t => {
          t.dropForeign('user_id', 'tutorials_user_id_foreign');
          t.dropForeign('instructor_id', 'tutorials_instructor_id_foreign');
        }),
        knex.schema.table('comments', t => {
          t.dropForeign('user_id', 'comments_user_id_foreign');
          t.dropForeign('tutorial_id', 'comments_tutorial_id_foreign');
        }),
        knex.schema.table('tutorials_categories', t => {
          t.dropForeign(
            'tutorial_id',
            'tutorials_comments_tutorial_id_foreign'
          );
          t.dropForeign(
            'category_id',
            'tutorials_comments_category_id_foreign'
          );
        })
      ]);

      console.log('foreign keys dropped');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

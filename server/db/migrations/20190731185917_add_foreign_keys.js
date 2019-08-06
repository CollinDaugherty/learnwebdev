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
          t.dropForeign('user_id');
          t.dropForeign('instructor_id');
        }),
        knex.schema.table('comments', t => {
          t.dropForeign('user_id');
          t.dropForeign('tutorial_id');
        })
      ]);

      console.log('foreign keys dropped');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
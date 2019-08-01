exports.up = function(knex, Promise) {
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all([
        // USERS TABLE
        knex.schema.createTable('users', t => {
          t.uuid('id')
            .unique()
            .notNullable();
          t.string('name').notNullable();
          t.string('email')
            .unique()
            .notNullable();
          t.string('password').notNullable();
          t.timestamp('joined', { useTz: false }).notNullable();
          t.text('avatar');
          t.boolean('is_admin')
            .defaultTo(false)
            .notNullable();
        }),

        // INSTRUCTORS TABLE
        knex.schema.createTable('instructors', t => {
          t.increments('id').notNullable();
          t.string('name').notNullable();
          t.text('website');
          t.string('github');
          t.string('twitter');
          t.text('avatar');
        }),

        // TUTORIALS TABLE
        knex.schema.createTable('tutorials', t => {
          t.increments('id').notNullable();
          t.uuid('user_id')
            .unique()
            .notNullable();
          t.integer('instructor_id');
          t.string('title').notNullable();
          t.text('url').notNullable();
          t.timestamp('posted', { useTz: false }).notNullable();
          t.enum('cost', ['free', 'paid']).notNullable();
          t.enum('medium', ['article', 'video']).notNullable();
          t.enum('difficulty', ['beginner', 'advanced']).notNullable();
          t.integer('upvotes')
            .defaultTo(1)
            .notNullable();
          t.integer('downvotes')
            .defaultTo(0)
            .notNullable();
          t.integer('views')
            .defaultTo(0)
            .notNullable();
        }),

        // COMMENTS TABLE
        knex.schema.createTable('comments', t => {
          t.increments('id').notNullable();
          t.uuid('user_id').notNullable();
          t.integer('tutorial_id').notNullable();
          t.integer('isChildOf');
          t.text('body').notNullable();
          t.timestamp('posted', { useTz: false }).notNullable();
          t.integer('upvotes')
            .defaultTo(1)
            .notNullable();
          t.integer('downvotes')
            .defaultTo(0)
            .notNullable();
        }),

        // CATEGORIES TABLE
        knex.schema.createTable('categories', t => {
          t.increments('id').notNullable();
          t.string('name').notNullable();
        }),

        // TUTORIALS_CATEGORIES TABLE
        knex.schema.createTable('tutorials_categories', t => {
          t.integer('tutorial_id').notNullable();
          t.integer('category_id').notNullable();
        })
      ]);

      console.log('Tables created successfully');
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
        knex.schema.dropTable('users'),
        knex.schema.dropTable('instructors'),
        knex.schema.dropTable('tutorials'),
        knex.schema.dropTable('comments'),
        knex.schema.dropTable('categories'),
        knex.schema.dropTable('tutorials_categories')
      ]);

      console.log('Tables dropped');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

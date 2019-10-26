exports.up = function(knex) {
  return Promise.all([
    // USERS TABLE
    knex.schema.createTable('users', t => {
      t.uuid('id')
        .primary()
        .unique()
        .notNullable();
      t.string('name').notNullable();
      t.string('email')
        .unique()
        .notNullable();
      t.string('password').notNullable();
      t.timestamp('joined', { useTz: false }).notNullable();
      t.text('website');
      t.string('github');
      t.string('twitter');
      t.text('avatar');
      t.boolean('is_admin')
        .defaultTo(false)
        .notNullable();
    }),

    // INSTRUCTORS TABLE
    knex.schema.createTable('instructors', t => {
      t.uuid('id')
        .primary()
        .unique()
        .notNullable();
      t.string('name')
        .unique()
        .notNullable();
      t.timestamp('created', { useTz: false }).notNullable();
      t.text('website');
      t.string('github');
      t.string('twitter');
      t.text('avatar');
    }),

    // TUTORIALS TABLE
    knex.schema.createTable('tutorials', t => {
      t.string('id')
        .primary()
        .unique()
        .notNullable();
      t.uuid('user_id').notNullable();
      t.uuid('instructor_id');
      t.string('instructor_name');
      t.string('title').notNullable();
      t.text('url')
        .unique()
        .notNullable();
      t.timestamp('date', { useTz: false }).notNullable();
      t.enum('cost', ['free', 'paid']).notNullable();
      t.enum('medium', ['article', 'video']).notNullable();
      t.enum('difficulty', ['beginner', 'advanced']).notNullable();
      t.specificType('categories', 'text ARRAY').notNullable();
    }),

    // COMMENTS TABLE
    knex.schema.createTable('comments', t => {
      t.string('id')
        .primary()
        .unique()
        .notNullable();
      t.uuid('user_id').notNullable();
      t.string('tutorial_id').notNullable();
      t.text('body').notNullable();
      t.timestamp('date', { useTz: false }).notNullable();
    }),

    knex.schema.createTable('tutorial_votes', t => {
      t.uuid('id')
        .primary()
        .unique()
        .notNullable();
      t.string('tutorial_id').notNullable();
      t.uuid('user_id').notNullable();
      t.smallint('vote_value');
    }),
    knex.schema.createTable('comment_votes', t => {
      t.uuid('id')
        .primary()
        .unique()
        .notNullable();
      t.string('comment_id').notNullable();
      t.uuid('user_id').notNullable();
      t.smallint('vote_value');
    }),
    knex.schema.createTable('favorites', t => {
      t.uuid('id')
        .primary()
        .unique()
        .notNullable();
      t.string('tutorial_id').notNullable();
      t.uuid('user_id').notNullable();
      t.timestamp('date', { useTz: false }).notNullable();
    })
  ]);

  console.log('Tables created successfully');
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('instructors'),
    knex.schema.dropTable('tutorials'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('tutorial_votes'),
    knex.schema.dropTable('comment_votes'),
    knex.schema.dropTable('favorites')
  ]);

  console.log('Tables dropped');
};

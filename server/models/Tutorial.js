const Model = require('objection').Model;
const knex = require('../db/knex');

Model.knex(knex);

class Tutorial extends Model {
  static get tableName() {
    return 'tutorials';
  }

  static get relationMappings() {
    const User = require('./User');
    const Instructor = require('./Instructor');
    const Comment = require('./Comment');

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tutorials.user_id',
          to: 'users.id'
        }
      },

      instructors: {
        relation: Model.BelongsToOneRelation,
        modelClass: Instructor,
        join: {
          from: 'tutorials.instructor_id',
          to: 'instructors.id'
        }
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'tutorials.id',
          to: 'comments.tutorial_id'
        }
      }
    };
  }
}

module.exports = Tutorial;

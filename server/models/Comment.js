const Model = require('objection').Model;
const knex = require('../db/knex');

Model.knex(knex);

class Comment extends Model {
  static get tableName() {
    return 'comments';
  }

  static get relationMappings() {
    const Tutorial = require('./Tutorial');

    return {
      tutorial: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tutorial,
        join: {
          from: 'comments.tutorial_id',
          to: 'tutorials.id'
        }
      }
    };
  }
}

module.exports = Comment;

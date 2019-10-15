const Model = require('objection').Model;
const knex = require('../db/knex');

Model.knex(knex);

class Favorite extends Model {
  static get tableName() {
    return 'favorites';
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'favorites.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Favorite;

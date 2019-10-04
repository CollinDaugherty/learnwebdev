const Model = require('objection').Model;
const knex = require('../db/knex');

Model.knex(knex);

class TutorialVote extends Model {
  static get tableName() {
    return 'tutorial_votes';
  }
}

module.exports = TutorialVote;

const Model = require('objection').Model;
const knex = require('../db/knex');

Model.knex(knex);

class Instructor extends Model {
  static get tableName() {
    return 'instructors';
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('id', 'name', 'avatar');
      }
    };
  }
}

module.exports = Instructor;

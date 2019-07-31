const Password = require('objection-password')();
const Model = require('objection').Model;
const knex = require('../db/knex');

Model.knex(knex);

class User extends Password(Model) {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;

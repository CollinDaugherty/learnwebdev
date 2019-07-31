const { Model } = require('objection');

class Tutorial extends Model {
  static get tableName() {
    return 'tutorials';
  }
}

module.exports = Tutorial;

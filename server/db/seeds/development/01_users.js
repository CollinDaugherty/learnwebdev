const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const saltRounds = 10;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: uuidv4(),
          name: 'Tony Stark',
          email: 'tonystark@starkindustries.com',
          password: bcrypt.hashSync('WarMachineSux', saltRounds),
          joined: new Date(),
          is_admin: true
        },
        {
          id: uuidv4(),
          name: 'Steve Rogers',
          email: 'steverogers@shield.gov',
          password: bcrypt.hashSync('Peggy', saltRounds),
          joined: new Date(),
          is_admin: false
        },
        {
          id: uuidv4(),
          name: 'Thor Odinson',
          email: 'godofthunder@asgard.space',
          password: bcrypt.hashSync('StrongestAvenger', saltRounds),
          joined: new Date(),
          is_admin: false
        }
      ]);
    });
};

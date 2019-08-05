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
          id: '1bfb309c-5eb3-4a03-9fc5-977e1561f3db',
          name: 'Tony Stark',
          email: 'tonystark@starkindustries.com',
          password: bcrypt.hashSync('WarMachineSux', saltRounds),
          joined: new Date(),
          is_admin: true
        },
        {
          id: '4bd58c3c-0388-443c-abea-978ea2afa2eb',
          name: 'Steve Rogers',
          email: 'steverogers@shield.gov',
          password: bcrypt.hashSync('Peggy', saltRounds),
          joined: new Date(),
          is_admin: false
        },
        {
          id: '54825bc3-b0eb-4b02-bf44-ce26987658a1',
          name: 'Thor Odinson',
          email: 'godofthunder@asgard.space',
          password: bcrypt.hashSync('StrongestAvenger', saltRounds),
          joined: new Date(),
          is_admin: false
        }
      ]);
    });
};

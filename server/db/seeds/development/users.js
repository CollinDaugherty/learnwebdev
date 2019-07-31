const uuidv4 = require('uuid/v4');

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
          password:
            '$2y$12$opytrRf6QugaIege4JASduUX5vYFMQAN/daJrxcySSklSCcy/f.aW', // hash for WarMachineSux
          joined: new Date(),
          is_admin: true
        },
        {
          id: uuidv4(),
          name: 'Steve Rogers',
          email: 'steverogers@shield.gov',
          password:
            '$2y$12$xF8aTgXRxMMGpjunavNFAucKyN.W340F.YRRo6rkMsrgyNQK9D2B6', // hash for Peggy
          joined: new Date(),
          is_admin: false
        },
        {
          id: uuidv4(),
          name: 'Thor Odinson',
          email: 'godofthunder@asgard.space',
          password:
            '$2y$12$kzV2xXA5qXU75xYzPkXx.e/leTaWtS1nUfQr33KsJHnDrx0GioaXO', // hash for StrongestAvenger
          joined: new Date(),
          is_admin: false
        }
      ]);
    });
};

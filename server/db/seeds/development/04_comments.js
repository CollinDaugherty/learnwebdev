exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comments').insert([
        {
          id: '9947da4c-578c-4a14-982e-89f5012b5841',
          user_id: '4bd58c3c-0388-443c-abea-978ea2afa2eb',
          tutorial_id: '301abbb5-5a52-428c-a9ba-57729df7cb6b',
          isChildOf: null,
          body: 'FIRST!',
          posted: new Date()
        },
        {
          id: 'e4df0b93-0022-4ae3-841b-603935c5661a',
          user_id: '4bd58c3c-0388-443c-abea-978ea2afa2eb',
          tutorial_id: '301abbb5-5a52-428c-a9ba-57729df7cb6b',
          isChildOf: '9947da4c-578c-4a14-982e-89f5012b5841',
          body: 'SECOND!',
          posted: new Date()
        },
        {
          id: '43a6edeb-b47e-4be2-8a29-66cb910f36bd',
          user_id: '4bd58c3c-0388-443c-abea-978ea2afa2eb',
          tutorial_id: '301abbb5-5a52-428c-a9ba-57729df7cb6b',
          isChildOf: null,
          body: 'FIRST!!',
          posted: new Date()
        }
      ]);
    });
};

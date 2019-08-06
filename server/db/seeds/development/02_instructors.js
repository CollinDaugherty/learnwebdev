exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('instructors')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('instructors').insert([
        {
          id: '9d3a947b-7a29-4995-9dd7-6eae776deb21',
          name: 'Tania Rascia',
          website: 'https://taniarascia.com',
          github: 'taniarascia',
          twitter: 'taniarascia',
          avatar: ''
        },
        {
          id: '26565a7a-833e-4c5c-8d56-7eba5f6b0fb4',
          name: 'Wes Bos',
          website: 'https://wesbos.com',
          github: 'wesbos',
          twitter: 'wesbos',
          avatar: ''
        },
        {
          id: '914b36bc-930a-4030-b27c-f2e83b540d61',
          name: 'Chris Coyier',
          website: 'https://chriscoyier.net/',
          github: 'chriscoyier',
          twitter: 'chriscoyier',
          avatar: ''
        }
      ]);
    });
};

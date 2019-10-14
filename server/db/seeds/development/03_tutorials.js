exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tutorials')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tutorials').insert([
        {
          id: '301abbb5',
          user_id: '54825bc3-b0eb-4b02-bf44-ce26987658a1', // Thor
          instructor_id: '9d3a947b-7a29-4995-9dd7-6eae776deb21',
          instructor_name: 'Tania Rascia',
          title:
            'Design for Developers: Specific Steps to Improve Your Website Design',
          url: 'https://www.taniarascia.com/design-for-developers/',
          posted: new Date(),
          cost: 'free',
          medium: 'article',
          difficulty: 'beginner',
          categories: ['html', 'css']
        },
        {
          id: '41e72774',
          user_id: '1bfb309c-5eb3-4a03-9fc5-977e1561f3db', // Tony Stark
          instructor_id: '914b36bc-930a-4030-b27c-f2e83b540d61',
          instructor_name: 'Chris Coyier',
          title: 'CSS Custom Properties and Theming',
          url: 'https://css-tricks.com/css-custom-properties-theming/',
          posted: new Date(),
          cost: 'free',
          medium: 'article',
          difficulty: 'advanced',
          categories: ['css']
        },
        {
          id: '17bfc1d4',
          user_id: '4bd58c3c-0388-443c-abea-978ea2afa2eb', // Steve Rogers
          instructor_id: '26565a7a-833e-4c5c-8d56-7eba5f6b0fb4',
          instructor_name: 'Wes Bos',
          title: 'JavaScript30',
          url: 'https://javascript30.com/',
          posted: new Date(),
          cost: 'free',
          medium: 'video',
          difficulty: 'beginner',
          categories: ['js']
        }
      ]);
    });
};

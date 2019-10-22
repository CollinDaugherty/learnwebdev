const TutorialVote = require('./models/TutorialVote');
const Comment = require('./models/Comment');
const Favorite = require('./models/Favorite');

const getTutorialDetails = async (req, tutorials) => {
  let list = [];

  for (tutorial of tutorials) {
    if (req.user) {
      const doesFavoriteExist = await Favorite.query()
        .where('tutorial_id', tutorial.id)
        .where('user_id', req.user.id)
        .then(favorite => favorite)
        .catch(err => console.log(err));

      if (doesFavoriteExist.length) {
        tutorial.favorited = true;
      }
    } else {
      tutorial.favorited = false;
    }

    const commentCount = await Comment.query()
      .where('tutorial_id', tutorial.id)
      .count('id')
      .catch(err => console.log(err));

    tutorial.commentCount = Number(commentCount[0].count);

    let voteCount = await TutorialVote.query()
      .where('tutorial_id', tutorial.id)
      .sum('vote_value')
      .then(data => data[0].sum)
      .catch(err => console.log(err));

    if (voteCount === null) {
      voteCount = 0;
    }

    if (req.user) {
      let voteStatus = await TutorialVote.query()
        .where('tutorial_id', tutorial.id)
        .where('user_id', req.user.id)
        .then(data => data[0].vote_value)
        .catch(err => console.log(err));

      tutorial.voteStatus = voteStatus;
    }

    tutorial.voteCount = voteCount;
    list.push({ ...tutorial });
  }
  return list;
};

module.exports = getTutorialDetails;

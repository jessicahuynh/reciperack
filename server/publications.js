Meteor.publish("theProfiles",function(){return Profiles.find();});
Meteor.publish("theRecipes",function(){return Recipes.find();});
Meteor.publish("theScores",function(){return Scores.find();});


Meteor.publish("userData", function () {
  if (this.userId) {
	  return Meteor.users.find({}); //, //{_id: this.userId},
                             //{fields: {'profile': 1, 'things': 1}});
  } else {
    this.ready();
  }
});


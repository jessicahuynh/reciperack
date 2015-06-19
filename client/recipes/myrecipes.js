Template.myrecipes.helpers({
	recipesData: function() {
		return Recipes.find( {addedBy:Meteor.userId()}, {sort: {addedAt:-1} } );
	}
});


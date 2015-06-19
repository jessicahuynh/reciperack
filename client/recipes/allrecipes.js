Template.allrecipes.helpers({
	booksData: function() {
		return Recipes.find( {}, {sort: {addedAt:-1} } );
	}
});

Template.allrecipes.events({

});
Template.allrecipes.helpers({
	recipesData: function() {
		return Recipes.find( {}, {sort: {addedAt:-1} } );
	},
	preptime:function() {
		var a = this.preptime;
		if (a[0] == null || a[0] == 0) {
			return "N/A";
		}
		else {
			return a[0] + " " + a[1];
		}
	},
	cooktime: function() {
		var a = this.cooktime;
		if (a[0] == null || a[0] == 0) {
			return "N/A";
		}
		else {
			return a[0] + " " + a[1];
		}
	},
	creator: function() {
		var c = this.addedBy;
		if (Meteor.users.findOne({_id:c}).profile.userName == null) {
			return Meteor.users.findOne({_id:c}).emails[0].address;
		}
		else {
			return Meteor.users.findOne({_id:c}).profile.userName;
		}
	}
});

Template.allrecipes.events({
	'click .view-btn': function() {
		event.preventDefault();
		Session.set("viewrecipe",this._id);
		Router.go('viewRecipe',{_id:this._id});
	},
});
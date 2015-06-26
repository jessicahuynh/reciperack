Session.setDefault("recipesSortType","addedAt");

Template.allrecipes.helpers({
	recipesData: function() {
		switch (Session.get("recipesSortType")) {
			case "addedAt":
				return Recipes.find( {}, {sort: {addedAt:-1} } );
				break;
			case "title":
				return Recipes.find( {}, {sort: {title:1} } );
				break;
		}
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
	'click #recipeSort li':function(event) {
		event.preventDefault();
		// removes active class from previous tab
		$(".nav li.active").removeClass("active");

		// toggles the active class for the li you clicked on
		// make sure to set data-toggle="pill"/"tab" for it to work!
		if (!$(this).hasClass("active")) {
			$(this).toggleClass("active");
		}
	},
	'click #addedAt':function(event) {
		event.preventDefault();
		Session.set("recipesSortType","addedAt");
	},
	'click #title':function(event) {
		event.preventDefault();
		Session.set("recipesSortType","title");
	}
});
Template.recipe.helpers({
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
	}
});

Template.recipe.events({
	'click .view-btn': function() {
		event.preventDefault();
		Session.set("viewrecipe",this._id);
		Router.go('viewRecipe',{_id:this._id});
	},
	'click .edit-btn': function() {
		event.preventDefault();
		Session.set("editedrecipe",this._id);
		Router.go('editrecipe',{_id:this._id});
	},
	'click .delete-btn': function() {
		event.preventDefault();
		Recipes.remove(this._id);
	}
});
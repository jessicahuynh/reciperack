Template.welcome.helpers({
	recentData: function() {
		return Recipes.find( {}, {sort: {addedAt:-1}, limit:5 } );
	},

	recommendedData: function() {
		sizeOf = Recipes.find({addedBy:Meteor.userId()}).fetch();
		if (sizeOf.length == 0) {
			return;
		}
		else {
			rand = Math.floor(Math.random() * sizeOf.length);
			aTag = sizeOf[rand].tags[0];
			return Recipes.find( {tags:aTag}, {sort: {limit: 3} } );
		}
	},

	recommendedTag: function() {
		return aTag;
	},

	mostRecentRecipe: function() {
		return Recipes.findOne();
	},
	recipePage: function() {
		return "/viewRecipe/"+this._id;
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
	prepStep:function(){
		return Recipes.findOne({}).prepsteps;
	},
	step:function(){
		return this;
	}
});
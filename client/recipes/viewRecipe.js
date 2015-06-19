Template.viewRecipe.helpers({
	recipe:function() {
		return Recipes.findOne({_id:Session.get("viewrecipe")});
	},
	creator: function() {
		var c = Recipes.findOne({_id:Session.get("viewrecipe")}).addedBy;
		if (Meteor.users.findOne({_id:c}).profile.userName == null) {
			return Meteor.users.findOne({_id:c}).emails[0].address;
		}
		else {
			return Meteor.users.findOne({_id:c}).profile.userName;
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
	ingredient:function() {
		return Recipes.findOne({_id:Session.get("viewrecipe")}).ingredients;
	},
	prepStep:function(){
		return Recipes.findOne({_id:Session.get("viewrecipe")}).prepsteps;
	},
	cookStep:function(){
		return Recipes.findOne({_id:Session.get("viewrecipe")}).cooksteps;
	},
	type:function(){
		var type = Recipes.findOne({_id:Session.get("viewrecipe")}).type;
		var s = [];
		var num = 0;

		if (type[0]) {
			num++;
			s.push("vegetarian");
		}
		if (type[1]) {
			num++;
			s.push("vegan");
		}
		if (type[2]) {
			num++;
			s.push("kosher");
		}
		if (type[3]) {
			s.push("halal");
		}
		if (type[4]) {
			s.push("gluten free");
		}

		switch(num) {
			case 0:
				return "This recipe is not suitable for any special diets.";
				break;
			case 1:
				return "This recipe is " + s[0] + "!";
				break;
			case 2:
				return "This recipe is " + s[0] + " and " + s[1] + "!";
			default:
				var str = "This recipe is ";
				for (var i = 0; i < s.length - 1; i++) {
					str += s[i] + ", "
				}
				str += " and " + s[s.length - 1] + "!";
				return str;
		}
	},
	elem:function(index) {
		return this[index];
	},
	step:function(){
		return this;
	}
});
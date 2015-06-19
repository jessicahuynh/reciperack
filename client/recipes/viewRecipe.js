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
		return getTypeText();
	},
	elem:function(index) {
		return this[index];
	},
	step:function(){
		return this;
	}
});

Template.viewRecipe.events({
	'click #readRecipeInfo':function(event) {
		event.preventDefault();
		var current = Recipes.findOne({_id:Session.get("viewrecipe")});

		msg = "Recipe title: " + current.title + ". ";
		if (current.preptime[0] == 0) {
			msg += "No preparation time is given. ";
		}
		else {
			msg += "Preparation time is " + current.preptime[0] + " " + current.preptime[1] + ". ";
		}
		if (current.cooktime[0] == 0) {
			msg += "No cooking time is given. ";
		}
		else {
			msg += "Cooking time is " + current.cooktime[0] + " " + current.cooktime[1] + ". ";
		}
		msg += getTypeText();

		window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
	},
	'click #readRecipeIngredients':function(event) {
		event.preventDefault();
		var current = Recipes.findOne({_id:Session.get("viewrecipe")});

		if (current.ingredients.length == 0) {
			msg = "Strangely, this recipe doesn't seem to list any ingredients.";
		}
		else {
			msg = "The ingredients are ";
			msg += current.ingredients;
		}

		window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
	},
	'click #readPrepSteps':function(event) {
		event.preventDefault();
		var current = Recipes.findOne({_id:Session.get("viewrecipe")});

		msg= "";

		if (current.prepsteps.length == 0) {
			msg = "Strangely, this recipe doesn't seem to list any steps for preparing ingredients.";
		}
		else {
			for (var i = 0; i < current.prepsteps.length; i++) {
				msg += current.prepsteps[i] + ". ";
			}
		}

		window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
	},
	'click #readCookSteps':function(event) {
		event.preventDefault();
		var current = Recipes.findOne({_id:Session.get("viewrecipe")});

		msg= "";

		if (current.cooksteps.length == 0) {
			msg = "Strangely, this recipe doesn't seem to list any steps for actually cooking food.";
		}
		else {
			for (var i = 0; i < current.cooksteps.length; i++) {
				msg += current.cooksteps[i] + ". ";
			}
		}

		window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
	}
});

function getTypeText() {
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
			return "This recipe is not suitable for any special diets. ";
			break;
		case 1:
			return "This recipe is " + s[0] + "! ";
			break;
		case 2:
			return "This recipe is " + s[0] + " and " + s[1] + "! ";
		default:
			var str = "This recipe is ";
			for (var i = 0; i < s.length - 1; i++) {
				str += s[i] + ", "
			}
			str += " and " + s[s.length - 1] + "! ";
			return str;
	}
}
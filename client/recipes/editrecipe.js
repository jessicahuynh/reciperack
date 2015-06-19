Template.editrecipe.helpers({
	currentRecipe:function() {
		numExtraIngredients = Recipes.findOne({_id:Session.get("editedrecipe")}).ingredients.length;
		return Recipes.findOne({_id:Session.get("editedrecipe")});
	},
	preptime:function(){
		return Recipes.findOne({_id:Session.get("editedrecipe")}).preptime[0];
	},
	prepsteps:function(){
		var steps = Recipes.findOne({_id:Session.get("editedrecipe")}).prepsteps;
		var s = "";
		if (steps != null) {
			steps.forEach(function(step) {
				s+= step + "\n";
			});
		}
		return s;
	},
	cooktime:function(){
		return Recipes.findOne({_id:Session.get("editedrecipe")}).cooktime[0];
	},
	cooksteps:function(){
		var steps = Recipes.findOne({_id:Session.get("editedrecipe")}).cooksteps;
		var s = "";
		if (steps != null) {
			steps.forEach(function(step) {
				s+= step + "\n";
			});
		}
		return s;
	}
});

Template.editrecipe.rendered = function(){
	// set dropdown for the units for prep time
	var unitPrep = Recipes.findOne({_id:Session.get("editedrecipe")}).preptime[1];
	$("#prepTimeUnits").val(unitPrep).prop("selected",true);

	// set dropdown for the units of cooking time
	var unitCook = Recipes.findOne({_id:Session.get("editedrecipe")}).cooktime[1];
	$("#cookingTimeUnits").val(unitCook).prop("selected",true);

	// set the checkbox types
	var check = Recipes.findOne({_id:Session.get("editedrecipe")}).type;
	toggleTheTypes(check);

	// set the ingredients!
	setIng();
};

Template.editrecipe.events({
	'click #addIngredientRow':function() {
		numExtraIngredients++;
		Session.set("numExtraIngredients",numExtraIngredients);

		var newRow = "<tr><td><input type=\"text\" class=\"form-control\" id=\"ingredNum"+numExtraIngredients+"\"></td><td><input type=\"text\" class=\"form-control\" id=\"ingredUnit"+numExtraIngredients+"\"></td><td><input type=\"text\" class=\"form-control\" id=\"ingredName"+numExtraIngredients+"\"></td></tr>";
		$("#dynamicIngredients").append(newRow);
		
	},
	'click .removeIngredient':function(){
		event.preventDefault();
		var t = event.target;
		var row = $(t).parent().parent().parent();
		// get the ingredient name
		var c = row.find("input")[2].value;
		
		var ing = Recipes.findOne({_id:Session.get("editedrecipe")}).ingredients;
		var r;
		for (var j = 0; j < ing.length; j++) {
			if (ing[j][2] == c) {
				r = j;
				break;
			}
		}
		console.log(ing[r]);
		
		row.remove();
	},
	'submit #editRecipe': function(event) {
		event.preventDefault();

		// recipe info
		var t = recipeTitle.value;
		var r = recipeRack.value;
		var g = recipeTags.value.split(",");
		var d = [vegetarian.checked,
			vegan.checked,
			kosher.checked,
			halal.checked,
			glutenfree.checked];

		if (r === "") {
			r = "default";
		}

		// ingredients
		var numIngred = Session.get("numExtraIngredients");
		var i = [];
		for (var j = 1; j <= numIngred; j++) {
			var num = "#ingredNum"+j;
			var unit = "#ingredUnit"+j;
			var name = "#ingredName"+j;
			i.push([
				$(num).val(),
				$(unit).val(),
				$(name).val()
			]);
		}

		// prep
		var prept = [prepTime.value,prepTimeUnits.value];
		var prepSteps = preparation.value.split("\n");

		// cooking
		var cookt = [cookingTime.value,cookingTimeUnits.value];
		var cookSteps = instructions.value.split("\n");

		Recipes.update(this._id,{$set: 
			{
				title:t,
				type:d,
				rack:r,
				tags:g,
				ingredients: i,
				preptime:prept,
				prepsteps:prepSteps,
				cooktime:cookt,
				cooksteps:cookSteps,
				comments:comments.value,
				addedBy:Meteor.userId(),
				addedAt:new Date()
			}
		});

		Router.go('/myrecipes');
	}
});

function toggleTheTypes(a) {
	if (a[0]) {
		$("#vegetarian").prop("checked",true);
	}
	if (a[1]) {
		$("#vegan").prop("checked",true);
	}
	if (a[2]) {
		$("#kosher").prop("checked",true);
	}
	if (a[3]) {
		$("#halal").prop("checked",true);
	}
	if (a[4]) {
		$("#glutenfree").prop("checked",true);
	}
}

function setIng() {
	var ing = Recipes.findOne({_id:Session.get("editedrecipe")}).ingredients;
	for (var i = 2; i <= numExtraIngredients; i++) {
		var newRow = "<tr><td><input type=\"text\" class=\"form-control\" id=\"ingredNum"+i+"\"></td><td><input type=\"text\" class=\"form-control\" id=\"ingredUnit"+i+"\"></td><td><input type=\"text\" class=\"form-control\" id=\"ingredName"+i+"\"></td></tr>";
		$("#dynamicIngredients").append(newRow);
	}
	for (var i = 1; i <= numExtraIngredients; i++) {
		var num = "#ingredNum"+i;
		var unit = "#ingredUnit"+i;
		var name = "#ingredName"+i;

		$(num).val(ing[i-1][0]);
		$(unit).val(ing[i-1][1]);
		$(name).val(ing[i-1][2]);
	}
}
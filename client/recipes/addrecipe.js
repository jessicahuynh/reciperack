Template.addRecipe.events({
	"submit #addrecipeform": function(event) {
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

		Recipes.insert({
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
		});

		Router.go('/myrecipes');
	}
});
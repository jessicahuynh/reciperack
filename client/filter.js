var filterList = [];

Template.filter.rendered = function() {
	Session.set("filteredRecipes",Recipes.find( {}, {sort: {addedAt:-1} } ).fetch());
}

Template.filter.events({
	'submit #filterIngred':function(event) {
		event.preventDefault();
		filterList.push(ingred.value);

		var newIngred = '<tr><td>'+ingred.value+'</td><td><a class="btn btn-danger remove-ingred"><span class="glyphicon glyphicon-minus"></span></a></td></tr>';

		$("#ingredList").append(newIngred);
		Session.set("filterList",filterList);

		findWithIngred();
		//console.log(filterList);

		ingred.value = '';
	},
	'click .remove-ingred':function(event){
		event.preventDefault();
		var i = $(event.target).parents('tr').children().html();
		if (filterList.indexOf(i) > -1) {
			filterList.splice(filterList.indexOf(i),1);
			$(event.target).parents('tr').remove();
			//console.log(i + " " + filterList);
		}

		Session.set("filterList",filterList);
		findWithIngred();

		if (filterList.length == 0) {
			Session.set("filteredRecipes",Recipes.find( {}, {sort: {addedAt:-1} } ).fetch());
		}
	},
	'click a.view-recipe':function(event) {
		Session.set("viewrecipe",this._id);
	}
});

Template.filter.helpers({
	recipesData:function() {
		return Session.get("filteredRecipes");
	},
	ingredients:function() {
		var i = this.ingredients
		if (i[0][0] == null || i[0][0] == 0) {
			return "N/A"
		}
		else {
			var list = [];
			i.forEach(function(ingredient) {
				list.push(ingredient[0] + " " + ingredient[1] + " of " + ingredient[2]);
			});
			return list;
		}
	},
	recipeId:function() {
		return this._id;
	}
});

function findWithIngred() {
	var r = Recipes.find( {}, {sort: {addedAt:-1} } ).fetch();
	var filteredRecipes = [];
	var counter = 0;
	// each recipe
	r.forEach(function(recipe) {
		var iList = recipe.ingredients;
		
		// each ingredient in the recipe
		iList.forEach(function(ingredientName) {
			// each filtered ingredient
			filterList.forEach(function(ingredient) {
				if (ingredientName[2]) {
					if (ingredientName[2].includes(ingredient)) {
						counter++;
					}
				}
			});
		});
		if (counter == filterList.length) {
			filteredRecipes.push(recipe);
		}
		counter = 0;
	});

	Session.set("filteredRecipes",filteredRecipes);
}
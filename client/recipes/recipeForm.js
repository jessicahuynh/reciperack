Session.setDefault("numExtraIngredients",1);
var numExtraIngredients = 1;

Template.recipeForm.events({
	'click #addIngredientRow':function() {
		numExtraIngredients++;
		Session.set("numExtraIngredients",numExtraIngredients);

		var newRow = "<tr><td><input type=\"text\" class=\"form-control\" id=\"ingredNum"+numExtraIngredients+"\"></td><td><input type=\"text\" class=\"form-control\" id=\"ingredUnit"+numExtraIngredients+"\"></td><td><input type=\"text\" class=\"form-control\" id=\"ingredName"+numExtraIngredients+"\"></td></tr>";
		$("#dynamicIngredients").append(newRow);
		
	}
});
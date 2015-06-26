var filterList = [];

Template.filter.events({
	'submit #filterIngred':function(event) {
		event.preventDefault();
		filterList.push(ingred.value);

		var newIngred = '<tr><td>'+ingred.value+'</td><td><a class="btn btn-danger remove-ingred"><span class="glyphicon glyphicon-minus"></span></a></td></tr>';

		$("#ingredList").append(newIngred);
		console.log(filterList);

		ingred.value = '';
	},
	'click .remove-ingred':function(event){
		event.preventDefault();
		var i = $(event.target).parents('tr').children().html();
		if (filterList.indexOf(i) > -1) {
			filterList.splice(filterList.indexOf(i),1);
			$(event.target).parents('tr').remove();
			console.log(i + " " + filterList);
		}
	}
});
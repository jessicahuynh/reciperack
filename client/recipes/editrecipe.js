// $(document).ready(function() {
// 	$("#bookStatus").val(Books.findOne({_id:Session.get("editedbook")}).status);
// });

Template.editrecipe.helpers({
	currentBook:function() {
		return Recipes.findOne({_id:Session.get("editedbook")});
	}
});

Template.editrecipe.rendered = function(){
	var recipe = Recipes.findOne({_id:Session.get("editedrecipe")});
	$("#bookStatus").val(recipe.status).prop("selected",true);
	//console.log(Status.value + book.status);
};

Template.editrecipe.events({
	"submit #editRecipe": function(event) {
		event.preventDefault();

		var t = event.target.bookTitle.value;
		var a = event.target.bookAuthor.value;
		var s = event.target.bookShelf.value;
		var i = event.target.bookISBN.value;
		var g = event.target.bookTags.value.split(",");
		var stat = event.target.bookStatus.value;

		if (s === "") {
			s = "default";
		}

		Recipes.update(this._id,{$set: 
			{
				title:t,
				author:a,
				shelf:s,
				isbn:i,
				tags:g,
				status:stat
			}
		});

		Router.go('/myrecipes');
	}
});
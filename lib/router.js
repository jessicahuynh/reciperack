Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});

Router.route('/about', {name: 'about'});

Router.route('/allrecipes', {name:'allrecipes'});

Router.route('/myrecipes', {name:'myrecipes'});

Router.route('/addRecipe', {name:'addRecipe'});

Router.route('/editRecipe/:_id', {name:'editrecipe',
	data: function() {
		return Recipes.find({_id:this.params._id});
	}
});

Router.route('/people',{name:'people'});

Router.route('/profile/:_id',
	{name:'profile',
	data: function(){ 		
		return Meteor.users.findOne({_id:this.params._id})
	}
});
Router.route('/profileEdit/:_id',
	{name:'profileEdit',
	data: function(){ 
		return Meteor.users.findOne({_id:this.params._id})
	}
});
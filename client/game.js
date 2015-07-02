Session.setDefault("gamescore",0);
Session.setDefault("timer",2000);

Template.game.helpers({
	score: function() {
		return Session.get("gamescore");
	},
	time: function() {
		return Session.get("timer");
	},
	userScore: function() {
		return Scores.find({},{sort:{userscore:-1}}).fetch();
	}
});

Template.game.events({
	'submit #addScore':function(event) {
		event.preventDefault();
		if ($("#controlGame").html() == "Done!") {
			Scores.insert({
				"username":winner.value,
				"userscore":Session.get("gamescore")
			});
			
			Session.set("timer",2000);
			Session.set("gamescore",0);
			winner.value = '';
			
			$("#controlGame").html("reset");
			
			$("#controlGame").hide();
			
			drawContext.clearRect(0,0,matchingGame.width,matchingGame.height);
		}
		else if ($("#controlGame").html() == "reset") {
			alert("Refresh your browesr and give it another go. :)");
		}
		else {
			alert("You need to let the timer run out first!");
		}
	}
});
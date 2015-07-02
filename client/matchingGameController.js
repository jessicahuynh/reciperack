Template.game.events({
	"click #controlGame": function (event) {
		console.log("pressed start");

		var r = theModel.running;
		if (!r) {
			theModel.running = true;
			theGameLoop.run();
			console.log("hi");
			$("#controlGame").html("Stop");

		} else {
			theModel.running = false;
			$("#controlGame").html("Start");
		}
	}
})

Template.game.rendered = function () {
	document.getElementById("matchingGame").addEventListener('mousemove',
		function (e) {
			if (theModel.running) {

				theModel.catch.x = 100 * (e.pageX - matchingGame.offsetLeft) / matchingGame.width;
				theModel.catch.y = 100 * (e.pageY - matchingGame.offsetTop) / matchingGame.height;
			}
		});
}
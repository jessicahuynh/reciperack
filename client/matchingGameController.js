Template.game.events({
	"click #controlGame": function(event){
		console.log("pressed start");

		var r = theModel.running;
		if (!r) {
			theModel.running=true;
			theGameLoop.run();
			console.log("hi");
			$("#controlGame").html("Stop");

		} else {
			theModel.running=false;
			$("#controlGame").html("Start");

			
		}
		
	}
})

// Template.game.rendered = function(){
// 	document.getElementById("matchingGame").addEventListener('mousemove', 
// 		function(e){
// 			if (theModel.running) {

// 				theModel.net.x = 100*(e.pageX-gameboard.offsetLeft)/gameboard.width;
// 				theModel.net.y = 100*(e.pageY-gameboard.offsetTop)/gameboard.height;
// 			}
// 		});
// }
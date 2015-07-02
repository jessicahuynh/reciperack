function run(){
	
	if (Session.get("timer") > 0) {
		theModel.update();
		theView.draw();
	}
	else {
		theModel.running = false;
		$("#controlGame").html("Done!");
	}
	
	
	if (theModel.running) 
		window.requestAnimationFrame(run);
}

theGameLoop = {run:run};
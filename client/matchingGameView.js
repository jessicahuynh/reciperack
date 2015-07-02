function draw() {
	drawContext = matchingGame.getContext("2d");
	drawContext.fillStyle="#eee";
	drawContext.fillRect(0,0,matchingGame.width,matchingGame.height);
	
	theModel.shapeList.forEach(function(ingred) {
		drawContext.fillStyle = ingred.color;
		
		if (ingred.shape == 'circle') {
			var path = new Path2D();
			path.arc(ingred.x * matchingGame.width / 100,
			ingred.y * matchingGame.height / 100,
			ingred.r * matchingGame.width / 100,
			0, 2 * Math.PI, true);
			drawContext.fill(path);
		}
		else if (ingred.shape == 'square') {
			drawContext.fillRect(ingred.x * matchingGame.width / 100,
			ingred.y * matchingGame.height / 100,ingred.r * matchingGame.width / 100,ingred.r * matchingGame.width / 100);
		}	
		
	});
	
	var cat = theModel.catch;
	drawContext.strokeStyle = cat.c;
	drawContext.beginPath();
	drawContext.arc(cat.x*matchingGame.width/100,
					cat.y*matchingGame.height/100,
					cat.r*matchingGame.width/100,
					0,2*Math.PI,true);
	drawContext.stroke();
}

theView = {draw:draw};
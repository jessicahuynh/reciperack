Template.stats.events({
	'click #drawIt':function(event) {
		drawTriangle();
		window.requestAnimationFrame(drawStuff);
	}
});

Template.stats.rendered = function() {
	drawStuff();
};

function decPart(x) {
	return x- Math.floor(x);
}

function drawStuff() {
	var time = new Date()
	var sec = time.getSeconds()*1000+ time.getMilliseconds();

	drawContext = drawSpace.getContext("2d");
	myGradient = drawContext.createLinearGradient(0,0,450,300);
	myGradient.addColorStop(decPart(sec),"red");
	myGradient.addColorStop(decPart(sec+0.15),"blue");
	myGradient.addColorStop(decPart(sec+0.3),"yellow");
	// x,y of top left
	// width, height
	drawContext.fillStyle=myGradient;
	drawContext.fillRect(0,0,600,300);

	drawContext.save();
	drawContext.translate(300,150);

	drawContext.rotate(0.1*sec/360*(2*Math.PI));

	drawContext.translate(-300,-150);

	drawContext.fillStyle="white";
	drawContext.fillRect(50,50,500,200);

	drawContext.restore();

	drawContext.fillStyle="red";
	drawContext.fillRect(295,145,20,10);
	drawContext.fillRect(300,140,10,20);

	window.requestAnimationFrame(drawStuff);
}
function drawTriangle() {
	drawContext.strokeStyle="#ff00ff";
	drawContext.moveTo(100,100);
	drawContext.lineTo(150,100);
	drawContext.lineTo(125,150);
	drawContext.lineTo(100,100);
	drawContext.stroke()
}

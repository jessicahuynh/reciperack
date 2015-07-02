function MatchingGameModel() {
	this.w = 100;
	this.h = 100;
	this.score = 0;
	this.shapeList = [];
	this.running = false;
	this.lastTime = (new Date()).getTime();
	this.catch = new EatIngredient(0, 0, 4, "black");
}

MatchingGameModel.prototype.update = function () {

	var theTime = (new Date()).getTime();
	var dt = theTime - this.lastTime; // in milliseconds
	this.lastTime = theTime;
	Session.set("timer",(Session.get("timer") - 1));

	var theNet = this.catch;
	for (var i = 0; i < this.shapeList.length; i++) {
		this.shapeList[i].update(dt / 1000.0);
		if (theNet.caught(this.shapeList[i])) {
			this.shapeList[i].alive = false;
			if (this.shapeList[i].shape == 'circle') {
				Session.set("gamescore",(Session.get("gamescore") + 1));
			}
			else {
				Session.set("gamescore",(Session.get("gamescore") - 1));
			}
		}
	}
	this.shapeList = _.filter(this.shapeList,
		function (i) { return i.alive });


}

MatchingGameModel.prototype.addIngredient = function (i) {
	this.shapeList.push(i);
}


function Ingredient(shape, color, x, y, r, vx, vy) {
	this.shape = shape;
	this.color = color;
	this.x = x;
	this.y = y;
	this.r = r;

	this.vx = vx;
	this.vy = vy;

	this.alive = true;
}

Ingredient.prototype.update = function (dt) {
	if ((this.y + this.r >= 100) || (this.y - this.r <= 0)) this.vy *= -1;
	if ((this.x + this.r >= 100) || (this.x - this.r <= 0)) this.vx *= -1;
	this.x += this.vx * dt;
	this.y += this.vy * dt;
}


function EatIngredient(x, y, r, c) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.c = c;
}

EatIngredient.prototype.caught = function (f) {
	var d = distFromOrigin(f.x - this.x, f.y - this.y);
	return (d < (f.r + this.r));
}

MatchingGameModel.prototype.init = function () {
	for (var i = 0; i < 50; i++) {
		theModel.addIngredient(new Ingredient('circle', getRandomColor(), getRandomNum(30, 70), getRandomNum(30, 70), 3, getRandomNum(-22, 22), getRandomNum(-22, 22)));
	}
	for (var i = 0; i < 50; i++) {
		theModel.addIngredient(new Ingredient('square', getRandomColor(), getRandomNum(30, 70), getRandomNum(30, 70), 6, getRandomNum(-22, 22), getRandomNum(-22, 22)));
	}
}

theModel = new MatchingGameModel();
theModel.init();
//console.log(theModel.shapeList);



function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function distFromOrigin(x, y) {
	return Math.sqrt(x * x + y * y);
}

theModel = (function() { 
	function MatchingGameModel() {
		this.w = 100;
		this.h = 100;
		this.score = 0;
		this.shapeList = [];
		this.running = false;
		this.lastTime = (new Date()).getTime();
	}
	
	MatchingGameModel.prototype.update = function () {
		var theTime = (new Date()).getTime();
		var dt = theTime - this.lastTime; // in milliseconds
		this.lastTime = theTime;
	
		for (var i = 0; i < this.shapeList.length; i++) {
			this.shapeList[i].update(dt/1000.0);
		}
	}
	
	MatchingGameModel.prototype.addIngredient = function(i) {
		this.shapeList.push(i);
	}
	
	
	function Ingredient(shape,color, x, y, r, vx, vy) {
		this.shape = shape;
		this.color = color;
		this.x = x;
		this.y = y;
		this.r = r;
		
		this.vx = vx;
		this.vy = vy;
	}
	
	Ingredient.prototype.update = function(dt) {
		if ((this.y + this.r >= 100) || (this.y - this.r <= 0)) this.vy *= -1;
		if ((this.x + this.r >= 100 )|| (this.x - this.r <= 0)) this.vx *= -1;
		this.x += this.vx*dt;
		this.y += this.vy*dt;
	}
	
	
	
	MatchingGameModel.prototype.init = function() {
		for (var i = 0; i < 50; i++) {
			theModel.addIngredient(new Ingredient('circle',getRandomColor(),getRandomNum(30,70),getRandomNum(30,70),3,getRandomNum(-22,22),getRandomNum(-22,22)));
		}
		for (var i = 0; i < 50; i++) {
			theModel.addIngredient(new Ingredient('square',getRandomColor(),getRandomNum(30,70),getRandomNum(30,70),6,getRandomNum(-22,22),getRandomNum(-22,22)));
		}
	}
	
	theModel = new MatchingGameModel(); 
	theModel.init();
	//console.log(theModel.shapeList);
	return theModel;
}())

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}
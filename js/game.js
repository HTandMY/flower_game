(function(){
    var Game = window.Game = function(){
        this.canvas = document.getElementById("game");
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.stage = new createjs.Stage("game");
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("red").drawCircle(0, 0, 40);
        this.circle.x = this.circle.y = 50;
        this.circle.x = this.circle.y = 50;
        this.stage.addChild(this.circle);
        this.stage.update();
    }
    
    Game.prototype.loading = function(){

    }




})()
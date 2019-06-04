(function(){
    var Background = window.Background = function(){
        this.bg = new createjs.Bitmap(game.assets.images.background1);
        this.bg.setTransform(0,0,game.canvas.width/1080,game.canvas.height/1920);
    }
    Background.prototype.render = function(){
        game.stage.addChild(this.bg);
    }
    Background.prototype.update = function(){

    }
})()
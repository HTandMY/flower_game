(function(){
    var Background = window.Background = function(){
        this.bg = new createjs.Bitmap(game.assets.images.background4);
        this.bg.setTransform(0,0,game.canvas.width/1080,game.canvas.height/1920);
        game.stage.addChild(this.bg);
    }
    Background.prototype.render = function(){
        
    }
    Background.prototype.update = function(){

    }
})()
(function(){
    var Background = window.Background = function(){
        this.bgObj = new createjs.Container();
	    game.stage.addChild(this.bgObj);
        this.bg = new createjs.Bitmap(game.assets.images.background4);
        this.bg.setTransform(0,0,game.canvas.width/1080,game.canvas.height/1920);
        this.bgObj.addChild(this.bg);
        this.bg.addEventListener("click",function(){
            console.log("点击了背景");
        });
    }

    Background.prototype.update = function(){

    }
})()
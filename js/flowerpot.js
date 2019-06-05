(function(){
    var Flowerpot = window.Flowerpot = function(){
        this.fpNum = 9;
        var self = this;
        for(let i = 0 ;i < this.fpNum ; i++){
            self.fp = new createjs.Bitmap(game.assets.images.flowerpot1);
            self.fp.y = 80*i;
            self.fp.scale = 0.2;
            game.stage.addChild(self.fp);
            self.fp.addEventListener("click",function(){
                console.log("点击了2");
                game.stage.removeChild(game.flowerpot.fp);
                game.manager.enter(1);
            });
        }
        
    }
    Flowerpot.prototype.render = function(){
        
    }
    Flowerpot.prototype.update = function(){
        
    }
})()
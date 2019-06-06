(function(){
    var Flowerpot = window.Flowerpot = function(){
        this.fpObj = new createjs.Container();
	    game.stage.addChild(this.fpObj);
        this.fpNum = 9;
        var self = this;

        var x = game.canvas.width / 2;
        var y = game.canvas.height / 2;
        var j = 0;
        var k = 0;
        for(let i = 0 ;i < this.fpNum ; i++){
            self.fp = new createjs.Bitmap(game.assets.images.flowerpot1);
            self.fp.regX = 225;
            self.fp.regY = 200;
            self.fp.x = x - 130 + 130 * j;
            self.fp.y = y - 200 + 200 * k;
            self.fp.scale = 0.18;
            self.fpObj.addChild(self.fp);
            self.fp.addEventListener("click",function(event){
                console.log(i);
                //点击删除自己的代码
                self.fpObj.removeChild(event.target);
                // game.manager.enter(1);
            });
            if(j < 2){
                j++
            }else{
                j = 0;
                k++
            }
        }
    }

    Flowerpot.prototype.update = function(){
        
    }
})()
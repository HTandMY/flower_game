(function(){
    var Flowerpot = window.Flowerpot = function(){
        this.fpObj = new createjs.Container();
	    game.stage.addChild(this.fpObj);
        this.fpNum = 9;
        this.fp = [];
        var self = this;

        var x = game.canvas.width / 2;
        var y = game.canvas.height / 2;
        var j = 0;
        var k = 0;
        for(let i = 0 ;i < this.fpNum ; i++){
            if(!game.gameObj.flowerpot[i].water){
                self.fp[i] = new createjs.Bitmap(game.assets.images.flowerpot1);
            }else{
                self.fp[i] = new createjs.Bitmap(game.assets.images.flowerpot2);
            }
            self.fp[i].regX = 225;
            self.fp[i].regY = 200;
            self.fp[i].x = x - 130 + 130 * j;
            self.fp[i].y = y - 200 + 200 * k;
            self.fp[i].scale = 0.18;
            self.fpObj.addChild(self.fp[i]);
            if(j < 2){
                j++
            }else{
                j = 0;
                k++
            }
        }
    }

    Flowerpot.prototype.update = function(){
        var self = this;
        for(let i = 0 ; i < self.fpNum ; i++){
            //比较上次浇水时间和现在时间，如果大于设定值，则土地变为干地
            if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 10){
                self.fp[i].image = game.assets.images.flowerpot1;
            }
        }
    }

    Flowerpot.prototype.watering = function(event,i){
        console.log(i);
        game.gameObj.flowerpot[i].time = new Date().getTime();
        let target = event.target;
        target.image = game.assets.images.flowerpot2;
        //点击删除自己的代码
        // this.fpObj.removeChild(event.target);
    }

    Flowerpot.prototype.bindEvent = function(){
        var self = this;
        for (let i = 0 ; i < self.fpNum ; i++) {
            self.fp[i].addEventListener("click",function(event){
                self.watering(event,i);
            });
        }
    }

    Flowerpot.prototype.removeEvent = function(){
        var self = this;
        for (let i = 0 ; i < self.fpNum ; i++) {
            self.fp[i].removeAllEventListeners("click");
        }
    }

})()
(function(){
    var Flowerpot = window.Flowerpot = function(){
        this.fpObj = new createjs.Container();
	    game.stage.addChild(this.fpObj);
        this.fp = [];

        var self = this;

        var x = game.canvas.width / 4;
        var y = game.canvas.height / 2;
        var j = 0;
        var k = 0;
        for(let i = 0 ;i < game.gameObj.playerdata.fpNum ; i++){
            if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 10){
                self.fp[i] = new createjs.Bitmap(game.assets.images.flowerpot_2);
            }else{
                self.fp[i] = new createjs.Bitmap(game.assets.images.flowerpot_1);
            }
            self.fp[i].regX = 50;
            self.fp[i].regY = 50;
            if(game.canvas.width > 768){
                self.fp[i].x = game.canvas.width / 2 - 192 + 192 * j;
            }else{
                self.fp[i].x = x * (j + 1);
            }
            self.fp[i].y = y - 190 + 190 * k;
            self.fp[i].scale = 0.8;
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

    }

    Flowerpot.prototype.flower = function(i){
        game.gameObj.flowerpot[i].time = new Date().getTime();
        game.gameObj.flowerpot[i].have = 1;
    }

    Flowerpot.prototype.bindEvent = function(name){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
                    if(game.gameObj.flowerpot[i].have){
                        self.fp[i].addEventListener("click",function(){
                            game.flower.watering(i);
                        });
                    }
                }
            break;
            case "flower":
                for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
                    self.fp[i].addEventListener("click",function(){
                        self.flower(i);
                    });
                }
            break;
        }
    }

    Flowerpot.prototype.removeEvent = function(){
        var self = this;
        for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
            self.fp[i].removeAllEventListeners("click");
        }
    }

})()
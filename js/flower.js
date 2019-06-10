(function(){
    var Flower = window.Flower = function(){
        this.fwObj = new createjs.Container();
        game.stage.addChild(this.fwObj);
        this.fw = [];
        var self = this;
        for(let i = 0 ;i < game.gameObj.playerdata.fpNum ; i++){
            self.fw[i] = new createjs.Bitmap();
            self.fw[i].regX = 50;
            self.fw[i].regY = 100;
            self.fw[i].scale = 0.8;
            self.fw[i].x = game.flowerpot.fp[i].x;
            self.fw[i].y = game.flowerpot.fp[i].y - 46;
            self.fwObj.addChild(self.fw[i]);
        }
    }

    Flower.prototype.update = function(){
        var self = this;
        for(let i = 0 ;i < game.gameObj.playerdata.fpNum ; i++){
            if(game.gameObj.flowerpot[i].have){
                if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 25){
                    self.fw[i].image = game.assets.images.narcissus_5;
                }else if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 20){
                    self.fw[i].image = game.assets.images.narcissus_4;
                }else if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 15){
                    self.fw[i].image = game.assets.images.narcissus_3;
                }else if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 10){
                    self.fw[i].image = game.assets.images.narcissus_2;
                }else if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 5){
                    self.fw[i].image = game.assets.images.narcissus_1;
                }else if((game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 <= 5){
                    self.fw[i].image = game.assets.images.narcissus_0;
                }
            }
        }
    }
})()
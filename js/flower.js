(function(){
    var Flower = window.Flower = function(){
        this.fwObj = new createjs.Container();
        game.stage.addChild(this.fwObj);
        this.fw = [];
        this.wt = [];
        this.waterData = new createjs.SpriteSheet({
            "images": [game.assets.images.water_2],
            "frames": {"width": 100 , "height": 150, "regX": 50, "regY": 100 , "count": 12},
            "animations": {
                "wt":[0,12, ,0.5]
            }
        });
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
            if((game.gameObj.nowtime - game.gameObj.flowerpot[i].watertime)/1000 > 10 && game.gameObj.flowerpot[i].water){
                self.fwObj.removeChild(this.wt[i]);
                game.gameObj.flowerpot[i].water = 0;
            }
        }
    }

    Flower.prototype.watering = function(i){
        var self = this;
        console.log(i);
        if(!game.gameObj.flowerpot[i].water){
            game.gameObj.flowerpot[i].watertime = new Date().getTime();
            self.wt[i] = new createjs.Sprite(this.waterData,"wt");
            self.wt[i].x = self.fw[i].x;
            self.wt[i].y = self.fw[i].y;
            self.fwObj.addChild(self.wt[i]);
            game.gameObj.flowerpot[i].water = 1;
        }
    }

    Flower.prototype.harvest = function(i){
        var self = this;
        if(game.gameObj.flowerpot[i].have && (game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 25){
            game.gameObj.flowerpot[i].have = 0;
            self.fw[i].image = undefined;
        }
    }

    Flower.prototype.bindEvent = function(name){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
                    if(game.gameObj.flowerpot[i].have){
                        self.fw[i].addEventListener("click",function(){
                            self.watering(i);
                        });
                    }
                }
            break;
            case "harvest":
                    for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
                        self.fw[i].addEventListener("click",function(){
                            self.harvest(i);
                        });
                    }
            break;
        }
    }

    Flower.prototype.removeEvent = function(){
        var self = this;
        for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
            self.fw[i].removeAllEventListeners("click");
        }
    }
})()
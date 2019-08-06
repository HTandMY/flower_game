(function(){
    var Flower = window.Flower = function(){
        this.fwObj = new createjs.Container();
        this.flowerObj = new createjs.Container();
        this.waterObj = new createjs.Container();
        this.fwObj.addChild(this.flowerObj , this.waterObj);
        this.fw = [];
        this.wt = [];
        this.time_1 = [0,0,0,0,0,0,0,0,0];
        this.time_2 = [];
        this.waterNum = 10;
        this.waterData = new createjs.SpriteSheet({
            "images": [game.assets.images.water_2],
            "frames": {"width": 100 , "height": 150, "regX": 50, "regY": 100 , "count": 12},
            "animations": {
                "wt":[0,12, ,0.5]
            }
        });

        for(let i = 0 ;i < game.gameObj.playerdata.fpNum ; i++){
            this.fw[i] = new createjs.Bitmap();
            this.fw[i].regX = 50;
            this.fw[i].regY = 100;
            this.fw[i].scale = 0.6;
            this.fw[i].x = game.flowerpot.fp[i].x;
            this.fw[i].y = game.flowerpot.fp[i].y - 35;
            this.flowerObj.addChild(this.fw[i]);
            if(game.gameObj.flowerpot[i].water){
                this.wt[i] = new createjs.Sprite(this.waterData,"wt");
                this.wt[i].x = this.fw[i].x;
                this.wt[i].y = this.fw[i].y;
                this.waterObj.addChild(this.wt[i]);
                game.gameObj.flowerpot[i].water = 1;
            }
            if((game.gameObj.nowtime - game.gameObj.flowerpot[i].watertime)/1000 > this.waterNum && game.gameObj.flowerpot[i].water){
                this.time_1[i] += 1;
            }else{
                this.time_1[i] = parseInt(this.time_1[i] + 0);
            }
            if(game.gameObj.flowerpot[i].watertime <= 0){
                this.time_2[i] = 0;
            }
        }
    }

    Flower.prototype.update = function(){
        for(let i = 0 ;i < game.gameObj.playerdata.fpNum ; i++){
            if((game.gameObj.nowtime - game.gameObj.flowerpot[i].watertime)/1000 >= this.waterNum  && game.gameObj.flowerpot[i].water && game.gameObj.flowerpot[i].have && game.gameObj.flowerpot[i].watertime != 0){
                this.time_1[i] += 1;
                this.time_2[i] = 0;
                this.waterObj.removeChild(this.wt[i]);
                game.gameObj.flowerpot[i].water = 0;
            }
            if((game.gameObj.nowtime - game.gameObj.flowerpot[i].watertime)/1000 < this.waterNum && game.gameObj.flowerpot[i].have){
                this.time_2[i] = parseInt((game.gameObj.nowtime - game.gameObj.flowerpot[i].watertime) / 1000);
            }
            if(game.gameObj.flowerpot[i].have){
                if(this.time_1[i] * 10 + this.time_2[i] > 25){
                    this.fw[i].image = game.assets.images.narcissus_5;
                }else if(this.time_1[i] * 10 + this.time_2[i] > 20){
                    this.fw[i].image = game.assets.images.narcissus_4;
                }else if(this.time_1[i] * 10 + this.time_2[i] > 15){
                    this.fw[i].image = game.assets.images.narcissus_3;
                }else if(this.time_1[i] * 10 + this.time_2[i] > 10){
                    this.fw[i].image = game.assets.images.narcissus_2;
                }else if(this.time_1[i] * 10 + this.time_2[i] > 5){
                    this.fw[i].image = game.assets.images.narcissus_1;
                }else if(this.time_1[i] * 10 + this.time_2[i] <= 5){
                    this.fw[i].image = game.assets.images.narcissus_0;
                }
            }
        }
    }

    Flower.prototype.watering = function(i){
        console.log(i);
        if(!game.gameObj.flowerpot[i].water){
            game.gameObj.flowerpot[i].watertime = new Date().getTime();
            this.wt[i] = new createjs.Sprite(this.waterData,"wt");
            this.wt[i].x = this.fw[i].x;
            this.wt[i].y = this.fw[i].y;
            this.waterObj.addChild(this.wt[i]);
            game.gameObj.flowerpot[i].water = 1;
        }
    }

    Flower.prototype.harvest = function(i){
        if(game.gameObj.flowerpot[i].have && (game.gameObj.nowtime - game.gameObj.flowerpot[i].time)/1000 > 25){
            game.gameObj.flowerpot[i].have = 0;
            game.gameObj.flowerpot[i].water = 0;
            game.gameObj.flowerpot[i].watertime = 0;
            this.waterObj.removeChild(this.wt[i]);
            this.fw[i].image = null;
            this.time_1[i] = 0;
            this.time_2[i] = 0;
        }
    }

    Flower.prototype.bindEvent = function(name){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
                    if(game.gameObj.flowerpot[i].have){
                        this.fw[i].addEventListener("click",function(){
                            self.watering(i);
                        });
                    }
                }
            break;
            case "harvest":
                    for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
                        this.fw[i].addEventListener("click",function(){
                            self.harvest(i);
                        });
                    }
            break;
        }
    }

    Flower.prototype.removeEvent = function(){
        for (let i = 0 ; i < game.gameObj.playerdata.fpNum ; i++) {
            this.fw[i].removeAllEventListeners("click");
        }
    }
})()
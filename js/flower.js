(function(){
    var Flower = window.Flower = function(){
        this.fwObj = new createjs.Container();
        this.flowerObj = new createjs.Container();
        this.waterObj = new createjs.Container();
        this.fwObj.addChild(this.flowerObj , this.waterObj);
        this.fw = [];
        this.wt = [];
        this.time_2 = [0,0,0,0,0,0,0,0,0];
        this.waterNum = 10;
        this.waterData = new createjs.SpriteSheet({
            "images": [game.assets.images.water_2],
            "frames": {"width": 100 , "height": 150, "regX": 50, "regY": 100 , "count": 12},
            "animations": {
                "wt":[0,12, ,0.5]
            }
        });

        for(let i = 0 ;i < game.gameObj.flowerpot.length ; i++){
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
                game.playerData.child('flowerpot/' + i).update({
                    water : 1
                });
            }
            if((game.nowtime - game.gameObj.flowerpot[i].watertime)/1000 > this.waterNum && game.gameObj.flowerpot[i].water){
                game.playerData.child('flowerpot/' + i).update({
                    time : game.gameObj.flowerpot[i].time + 1,
                });
                // this.time_1[i] += 1;
            }else{
                game.playerData.child('flowerpot/' + i).update({
                    time : game.gameObj.flowerpot[i].time + 0,
                });
                // this.time_1[i] = parseInt(this.time_1[i] + 0);
            }
            if(game.gameObj.flowerpot[i].watertime <= 0){
                this.time_2[i] = 0;
            }
        }
    }

    Flower.prototype.update = function(){
        for(let i = 0 ;i < game.gameObj.flowerpot.length ; i++){
            if((game.nowtime - game.gameObj.flowerpot[i].watertime)/1000 >= this.waterNum  && game.gameObj.flowerpot[i].water && game.gameObj.flowerpot[i].have && game.gameObj.flowerpot[i].watertime != 0){
                let time_1 = game.gameObj.flowerpot[i].time
                game.playerData.child('flowerpot/' + i).update({
                    time : time_1 + 1,
                    water : 0
                });
                this.time_2[i] = 0;
                this.waterObj.removeChild(this.wt[i]);
            }
            if((game.nowtime - game.gameObj.flowerpot[i].watertime)/1000 < this.waterNum && game.gameObj.flowerpot[i].have){
                this.time_2[i] = parseInt((game.nowtime - game.gameObj.flowerpot[i].watertime) / 1000);
            }
            if(game.gameObj.flowerpot[i].have){
                if(game.gameObj.flowerpot[i].time * 10 + this.time_2[i] > 25){
                    this.fw[i].image = game.assets.images.narcissus_5;
                }else if(game.gameObj.flowerpot[i].time * 10 + this.time_2[i] > 20){
                    this.fw[i].image = game.assets.images.narcissus_4;
                }else if(game.gameObj.flowerpot[i].time * 10 + this.time_2[i] > 15){
                    this.fw[i].image = game.assets.images.narcissus_3;
                }else if(game.gameObj.flowerpot[i].time * 10 + this.time_2[i] > 10){
                    this.fw[i].image = game.assets.images.narcissus_2;
                }else if(game.gameObj.flowerpot[i].time * 10 + this.time_2[i] > 5){
                    this.fw[i].image = game.assets.images.narcissus_1;
                }else if(game.gameObj.flowerpot[i].time * 10 + this.time_2[i] <= 5){
                    this.fw[i].image = game.assets.images.narcissus_0;
                }
            }
        }
    }

    Flower.prototype.watering = function(i){
        console.log(i);
        var self = this;
        if(!game.gameObj.flowerpot[i].water){
            //浇水
            game.playerData.child('flowerpot/' + i).update({
                water : 1,
                watertime : game.nowtime,
            },function(error) {
                if(error) {

                }else{
                    self.wt[i] = new createjs.Sprite(self.waterData,"wt");
                    self.wt[i].x = self.fw[i].x;
                    self.wt[i].y = self.fw[i].y;
                    self.waterObj.addChild(self.wt[i]);
                }
            });
        }
    }

    Flower.prototype.harvest = function(i){
        var self = this;
        if(game.gameObj.flowerpot[i].have && game.gameObj.flowerpot[i].time * 10 + this.time_2[i] > 25){
            game.playerData.child('flowerpot/' + i).update({
                have : 0,
                time : 0,
                water : 0,
                watertime : 0
            },function(error) {
                if(error) {

                }else{
                    self.waterObj.removeChild(self.wt[i]);
                    self.fw[i].image = null;
                    self.time_2[i] = 0;
                }
            });
        }
    }

    Flower.prototype.bindEvent = function(name){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.gameObj.flowerpot.length ; i++) {
                    if(game.gameObj.flowerpot[i].have){
                        this.fw[i].addEventListener("click",function(){
                            self.watering(i);
                        });
                    }
                }
            break;
            case "harvest":
                    for (let i = 0 ; i < game.gameObj.flowerpot.length ; i++) {
                        this.fw[i].addEventListener("click",function(){
                            self.harvest(i);
                        });
                    }
            break;
        }
    }

    Flower.prototype.removeEvent = function(){
        for (let i = 0 ; i < game.gameObj.flowerpot.length ; i++) {
            this.fw[i].removeAllEventListeners("click");
        }
    }
})()
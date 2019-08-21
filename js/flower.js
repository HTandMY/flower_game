(function(){
    var Flower = window.Flower = function(){
        this.fwObj = new createjs.Container();
        this.flowerObj = new createjs.Container();
        this.waterObj = new createjs.Container();
        this.fwObj.addChild(this.flowerObj , this.waterObj);
        this.fw = [];
        this.wt = [];
        this.state = true;
        this.time_2 = [0,0,0,0,0,0,0,0,0];
        this.waterNum = 10;
        this.waterData = new createjs.SpriteSheet({
            "images": [game.assets.images.water_2],
            "frames": {"width": 100 , "height": 150, "regX": 50, "regY": 100 , "count": 12},
            "animations": {
                "wt":[0,12, ,0.5]
            }
        });

        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
            this.fw[i] = new createjs.Bitmap();
            this.fw[i].regX = 50;
            this.fw[i].regY = 100;
            this.fw[i].scale = 0.6;
            this.fw[i].x = game.flowerpot.fp[i].x;
            this.fw[i].y = game.flowerpot.fp[i].y - 35;
            this.flowerObj.addChild(this.fw[i]);
            if(game.playerObj.flowerpot[i].water){
                this.wt[i] = new createjs.Sprite(this.waterData,"wt");
                this.wt[i].x = this.fw[i].x;
                this.wt[i].y = this.fw[i].y;
                this.waterObj.addChild(this.wt[i]);
                game.playerData.child('flowerpot/' + i).update({
                    water : 1
                });
            }
            if((game.nowtime - game.playerObj.flowerpot[i].watertime)/1000 > this.waterNum && game.playerObj.flowerpot[i].water){
                game.playerData.child('flowerpot/' + i).update({
                    time : game.playerObj.flowerpot[i].time + 1,
                });
                // this.time_1[i] += 1;
            }else{
                game.playerData.child('flowerpot/' + i).update({
                    time : game.playerObj.flowerpot[i].time + 0,
                });
                // this.time_1[i] = parseInt(this.time_1[i] + 0);
            }
            if(game.playerObj.flowerpot[i].watertime <= 0){
                this.time_2[i] = 0;
            }
        }
    }

    Flower.prototype.update = function(){
        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
            if((game.nowtime - game.playerObj.flowerpot[i].watertime)/1000 >= this.waterNum  && game.playerObj.flowerpot[i].water && game.playerObj.flowerpot[i].have && game.playerObj.flowerpot[i].watertime != 0){
                let time_1 = game.playerObj.flowerpot[i].time
                game.playerData.child('flowerpot/' + i).update({
                    time : time_1 + 1,
                    water : 0
                });
                this.time_2[i] = 0;
                this.waterObj.removeChild(this.wt[i]);
            }
            if((game.nowtime - game.playerObj.flowerpot[i].watertime)/1000 < this.waterNum && game.playerObj.flowerpot[i].have){
                this.time_2[i] = parseInt((game.nowtime - game.playerObj.flowerpot[i].watertime) / 1000);
            }
            if(game.playerObj.flowerpot[i].have){
                if(game.playerObj.flowerpot[i].time * 10 + this.time_2[i] > 25){
                    this.fw[i].image = game.assets.images["flower_" + game.gameObj.plantData[game.playerObj.flowerpot[i].id].name + "_5"];
                }else if(game.playerObj.flowerpot[i].time * 10 + this.time_2[i] > 20){
                    this.fw[i].image = game.assets.images["flower_" + game.gameObj.plantData[game.playerObj.flowerpot[i].id].name + "_4"];
                }else if(game.playerObj.flowerpot[i].time * 10 + this.time_2[i] > 15){
                    this.fw[i].image = game.assets.images["flower_" + game.gameObj.plantData[game.playerObj.flowerpot[i].id].name + "_3"];
                }else if(game.playerObj.flowerpot[i].time * 10 + this.time_2[i] > 10){
                    this.fw[i].image = game.assets.images["flower_" + game.gameObj.plantData[game.playerObj.flowerpot[i].id].name + "_2"];
                }else if(game.playerObj.flowerpot[i].time * 10 + this.time_2[i] > 5){
                    this.fw[i].image = game.assets.images["flower_" + game.gameObj.plantData[game.playerObj.flowerpot[i].id].name + "_1"];
                }else if(game.playerObj.flowerpot[i].time * 10 + this.time_2[i] <= 5){
                    this.fw[i].image = game.assets.images.flower_seed;
                }
            }
        }
    }

    Flower.prototype.watering = function(i){
        console.log(i);
        var self = this;
        if(!game.playerObj.flowerpot[i].water && this.state == true){
            //浇水
            this.state = false;
            game.playerData.child('flowerpot/' + i).update({
                water : 1,
                watertime : game.nowtime,
            },function() {
                self.wt[i] = new createjs.Sprite(self.waterData,"wt");
                self.wt[i].x = self.fw[i].x;
                self.wt[i].y = self.fw[i].y;
                self.waterObj.addChild(self.wt[i]);
                self.state = true;
            });
        }
    }

    Flower.prototype.harvest = function(i){
        var self = this;
        var plantId = game.playerObj.flowerpot[i].id;
        if(game.playerObj.flowerpot[i].have && game.playerObj.flowerpot[i].time * 10 + this.time_2[i] > 25 && this.state == true){
            this.state = false;
            game.playerData.child('flowerpot/' + i).update({
                have : 0,
                time : 0,
                water : 0,
                watertime : 0,
                id : -1
            },function() {
                if(game.playerObj.depository.exchange != undefined){
                    for(let n = 0 ; n < game.playerObj.depository.exchange.length ; n++){
                        if(game.playerObj.depository.exchange[n].id == plantId){
                            game.playerData.child('depository/exchange/' + n).update({
                                id : plantId,
                                num : game.playerObj.depository.exchange[n].num + Math.ceil(Math.random() * 2)
                            },function(){
                                removeFlower(i);
                            });
                            return;
                        }
                    }
                    game.playerData.child('depository/exchange/' + (game.playerObj.depository.exchange.length)).set({
                        id : plantId,
                        num : Math.ceil(Math.random() * 2)
                    },function(){
                        removeFlower(i);
                    });
                }else{
                    game.playerData.child('depository').update({
                        'exchange' : [{
                            id : plantId,
                            num : Math.ceil(Math.random() * 2)}]
                    },function(){
                        removeFlower(i);
                    });
                }
            });
        }
        function removeFlower(i){
            self.waterObj.removeChild(self.wt[i]);
            self.fw[i].image = null;
            self.time_2[i] = 0;
            self.state = true;
        }
    }

    Flower.prototype.bindEvent = function(name){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                    if(game.playerObj.flowerpot[i].have){
                        this.fw[i].addEventListener("click",function(){
                            self.watering(i);
                        });
                    }
                }
            break;
            case "harvest":
                    for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                        this.fw[i].addEventListener("click",function(){
                            self.harvest(i);
                        });
                    }
            break;
        }
    }

    Flower.prototype.removeEvent = function(){
        for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
            this.fw[i].removeAllEventListeners("click");
        }
    }
})()
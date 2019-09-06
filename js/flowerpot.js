(function(){
    var Flowerpot = window.Flowerpot = function(){
        this.fpObj = new createjs.Container();
        this.fp = [];
        this.arrowBox = [];
        this.moveState = true;
        this.movePx = 0;
        this.state = true;
        var self = this;
        var x = game.canvas.width / 4;
        var y = game.canvas.height / 4;
        var j = 0;
        var k = 0;
        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
            this.fp[i] = new createjs.Bitmap(game.assets.images[game.gameObj.decorationData[game.playerObj.flowerpot[i].flowerpot].itemname]);

            this.fp[i].regX = 50;
            this.fp[i].regY = 50;
            if(game.canvas.width > 768){
                this.fp[i].x = game.canvas.width / 2 - 192 + 192 * j;
            }else{
                this.fp[i].x = x * (j + 1);
            }
            this.fp[i].y = y + y * k - 5;
            this.fp[i].scale = 0.6;
            this.fpObj.addChild(this.fp[i]);
            if(j < 2){
                j++
            }else{
                j = 0;
                k++;
            }

            this.arrowBox[i] = new createjs.Bitmap(game.assets.images.flowerpot_arrow);
            this.arrowBox[i].regX = 16;
            this.arrowBox[i].x = this.fp[i].x;
            this.arrowBox[i].y = this.fp[i].y - 60;
            this.arrowBox[i].visible = false;
            this.fpObj.addChild(this.arrowBox[i]);
        }
        this.closeButton = new createjs.Bitmap(game.assets.images.button_back).set({
            regX : 32,
            regY : 32,
            scale : 0.8,
            x : game.canvas.width - 40,
            y : game.canvas.height - 35,
            visible : false
        });
        this.closeButton.addEventListener("click",function(){
            self.removeAllArrow();
            self.closeButton.visible = false;
            game.gameicon.iconObj.visible = true;
            game.manager.enter(1);
        });
        this.fpObj.addChild(this.closeButton);
    }

    Flowerpot.prototype.flower = function(i , flowerId , j){
        var self = this;
        if(!game.playerObj.flowerpot[i].have && this.state == true){
            this.state = false;
            game.playerObj.flowerpot[i].have = 1;
            game.playerObj.flowerpot[i].id = flowerId;
            game.playerObj.depository.seed[j].num -= 1;
            if(game.playerObj.depository.seed[j].num <= 0){
                game.playerObj.depository.seed.splice(j, 1);
                game.playerData.set(game.playerObj , function(){
                    self.removeArrow();
                    self.closeButton.visible = false;
                    self.state = true;
                    game.manager.enter(1);
                    game.gameicon.iconObj.visible = true;
                });
            }else{
                game.playerData.set(game.playerObj , function(){
                    self.state = true;
                });
            }
        }
    }

    Flowerpot.prototype.addFlower = function(flowerId , i){
        this.closeButton.visible = true;
        game.manager.enter(2.5);
        this.bindEvent("flower" , flowerId , i);
    }

    Flowerpot.prototype.changePot = function(itemName){
        this.closeButton.visible = true;
        game.manager.enter(7);
        this.bindEvent("pot" , itemName);
    }

    Flowerpot.prototype.doChangePot = function(i , potName){
        var self = this;
        if(this.state = true){
            this.state = false;
            game.playerObj.flowerpot[i].flowerpot = potName;
            game.playerData.set(game.playerObj , function(){
                self.fp[i].image = game.assets.images[game.gameObj.decorationData[potName].itemname];
                this.state = true;
            }); 
        }
    }

    Flowerpot.prototype.addArrow = function(state){
        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
            if(state == 0){
                if(game.playerObj.flowerpot[i].have){
                    this.arrowBox[i].visible = false;
                }else{
                    this.arrowBox[i].visible = true;
                }
            }else{
                this.arrowBox[i].visible = true;
            }
        }
    }

    Flowerpot.prototype.removeAllArrow = function(){
        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
            this.arrowBox[i].visible = false;
        }
    }

    Flowerpot.prototype.removeArrow = function(){
        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
            if(!game.playerObj.flowerpot[i].have){
                this.arrowBox[i].visible = false;
            }
        }
    }

    Flowerpot.prototype.arrowMove = function(state){
        if(this.moveState){
            for(let i = 0 ; i < game.playerObj.flowerpot.length ; i++){
                this.arrowBox[i].y += 1
                if(state == 0){
                    if(game.playerObj.flowerpot[i].have){
                        this.arrowBox[i].visible = false;
                    }
                }
            }
            if(this.movePx > 5){
                this.moveState = false;
            }else{
                this.movePx++
            }
        }else{
            for(let i = 0 ; i < game.playerObj.flowerpot.length ; i++){
                this.arrowBox[i].y -= 1
                if(state == 0){
                    if(game.playerObj.flowerpot[i].have){
                        this.arrowBox[i].visible = false;
                    }
                }
            }
            if(this.movePx < 0){
                this.moveState = true;
            }else{
                this.movePx--
            }
        }
    }

    Flowerpot.prototype.bindEvent = function(name , par , j){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                    if(game.playerObj.flowerpot[i].have){
                        self.fp[i].addEventListener("click",function(){
                            game.flower.watering(i);
                        });
                    }
                }
            break;
            case "flower":
                for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                    self.fp[i].addEventListener("click",function(){
                        self.flower(i , par , j);
                    });
                }
            break;
            case "pot":
                for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                    self.fp[i].addEventListener("click",function(){
                        self.doChangePot(i , par);
                    });
                }
            break;
        }
    }

    Flowerpot.prototype.removeEvent = function(){
        for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
            this.fp[i].removeAllEventListeners("click");
        }
    }

})()
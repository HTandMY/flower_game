(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();
        game.stage.addChild(this.iconObj);

        this.buttonwater = new createjs.Bitmap(game.assets.images.button_water_1);
        this.buttonwater.x = game.canvas.width - 70;
        this.buttonwater.y = game.canvas.height - 70;
        this.iconObj.addChild(this.buttonwater);

        this.buttonseed = new createjs.Bitmap(game.assets.images.button_seed_1);
        this.buttonseed.x = game.canvas.width - 140;
        this.buttonseed.y = game.canvas.height - 70;
        this.iconObj.addChild(this.buttonseed);

        this.buttonBg = new createjs.Bitmap(game.assets.images.button_bg);
        this.iconclick = new createjs.Bitmap();
        game.stage.enableMouseOver(50);
        this.bindEvent();
    }

    Gameicon.prototype.update = function(){
        this.iconclick.x = game.stage.mouseX;
        this.iconclick.y = game.stage.mouseY;
    }

    Gameicon.prototype.bindEvent = function(){
        var self = this;
        this.buttonwater.addEventListener("click",function(){
            if(game.manager.managerNum == 2){
                self.removeEvent();
                self.iconObj.removeChild(self.iconclick);
                self.iconObj.removeChild(self.buttonBg);
                self.buttonwater.image = game.assets.images.button_water_1;
                game.stage.enableMouseOver(50);
                game.manager.managerNum = 1;               
            }else{
                self.buttonseed.image = game.assets.images.button_seed_1;
                self.buttonwater.image = game.assets.images.button_water_3;
                self.buttonBg.x = self.buttonwater.x;
                self.buttonBg.y = self.buttonwater.y;
                self.iconObj.addChild(self.buttonBg);

                self.iconObj.swapChildren(self.buttonBg,self.buttonwater);
                self.iconclick.image = game.assets.images.button_water_click;
                self.iconclick.regX = 30;
                self.iconclick.regY = 30;
                self.iconclick.x = game.stage.mouseX;
                self.iconclick.y = game.stage.mouseY;
                self.iconObj.addChild(self.iconclick);
                self.removeEvent();
                game.flower.bindEvent("water");
                game.flowerpot.bindEvent("water");
                game.stage.enableMouseOver(0);
                game.manager.enter(2);
            }
        });
        this.buttonwater.addEventListener("mouseover",function(){
            self.buttonwater.image = game.assets.images.button_water_2;
        });
        this.buttonwater.addEventListener("mouseout",function(){
            self.buttonwater.image = game.assets.images.button_water_1;
        });

        this.buttonseed.addEventListener("click",function(){
            if(game.manager.managerNum == 3){
                game.flowerpot.removeEvent();
                self.iconObj.removeChild(self.iconclick);
                self.iconObj.removeChild(self.buttonBg);
                self.buttonseed.image = game.assets.images.button_seed_1;
                game.stage.enableMouseOver(50);
                game.manager.managerNum = 1;
            }else{
                self.buttonwater.image = game.assets.images.button_water_1;
                self.buttonseed.image = game.assets.images.button_seed_3;
                self.buttonBg.x = self.buttonseed.x;
                self.buttonBg.y = self.buttonseed.y;
                self.iconObj.addChild(self.buttonBg);

                self.iconObj.swapChildren(self.buttonBg,self.buttonseed);
                self.iconclick.image = game.assets.images.button_seed_1;
                self.iconclick.regX = 24;
                self.iconclick.regY = 24;
                self.iconclick.x = game.stage.mouseX;
                self.iconclick.y = game.stage.mouseY;
                self.iconObj.addChild(self.iconclick);
                self.removeEvent();
                game.flowerpot.bindEvent("flower");
                game.stage.enableMouseOver(0);
                game.manager.enter(3);
            }
        });
        this.buttonseed.addEventListener("mouseover",function(){
            self.buttonseed.image = game.assets.images.button_seed_2;
        });
        this.buttonseed.addEventListener("mouseout",function(){
            self.buttonseed.image = game.assets.images.button_seed_1;
        });

    }
    Gameicon.prototype.removeEvent = function(){
        game.flower.removeEvent();
        game.flowerpot.removeEvent();
    }
})()
(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();
        game.stage.addChild(this.iconObj);

        this.buttonWater = new createjs.Bitmap(game.assets.images.button_water_1);
        this.addIcon(this.buttonWater , -40);
        // this.buttonWater.regX = this.buttonWater.regY = 30;
        // this.buttonWater.x = game.canvas.width - 40;
        // this.buttonWater.y = game.canvas.height - 40;
        // this.iconObj.addChild(this.buttonWater);

        this.buttonSeed = new createjs.Bitmap(game.assets.images.button_seed_1);
        this.addIcon(this.buttonSeed , -110);
        // this.buttonSeed.regX = this.buttonSeed.regY = 30;
        // this.buttonSeed.x = game.canvas.width - 110;
        // this.buttonSeed.y = game.canvas.height - 40;
        // this.iconObj.addChild(this.buttonSeed);

        this.buttonHand = new createjs.Bitmap(game.assets.images.button_hand_1);
        this.addIcon(this.buttonHand , -180);
        // this.buttonHand.regX = this.buttonHand.regY = 30;
        // this.buttonHand.x = game.canvas.width - 180;
        // this.buttonHand.y = game.canvas.height - 40;
        // this.iconObj.addChild(this.buttonHand);

        this.buttonShop = new createjs.Bitmap(game.assets.images.button_shop_1);
        this.addIcon(this.buttonShop , 40 - game.canvas.width );
        // this.buttonShop.regX = this.buttonShop.regY = 30;
        // this.buttonShop.x = 40;
        // this.buttonShop.y = game.canvas.height - 40;
        // this.iconObj.addChild(this.buttonShop);

        this.buttonBg = new createjs.Bitmap(game.assets.images.button_bg);
        this.buttonBg.regX = this.buttonBg.regY = 30;

        this.iconClick = new createjs.Bitmap();
        this.iconClick.regX = this.iconClick.regY = 30;
        
        this.bindEvent();
    }

    Gameicon.prototype.addIcon = function(iconName , num){
        iconName.regX = iconName.regY = 30;
        iconName.x = game.canvas.width + (num);
        iconName.y = game.canvas.height - 40;
        this.iconObj.addChild(iconName);
    }

    Gameicon.prototype.update = function(){
        this.rotate();

    }

    Gameicon.prototype.bindEvent = function(){
        var self = this;
        this.buttonWater.addEventListener("click",function(){
            if(game.manager.managerNum == 2){
                self.removeEvent();
                self.iconObj.removeChild(self.iconClick);
                self.iconObj.removeChild(self.buttonBg);
                self.buttonWater.image = game.assets.images.button_water_1;
                game.manager.managerNum = 1;
            }else{
                self.buttonWater.image = game.assets.images.button_water_3;
                self.buttonSeed.image = game.assets.images.button_seed_1;
                self.buttonHand.image = game.assets.images.button_hand_1;
                self.buttonBg.x = self.buttonWater.x;
                self.buttonBg.y = self.buttonWater.y;
                self.iconObj.addChild(self.buttonBg);

                self.iconObj.swapChildren(self.buttonBg,self.buttonWater);
                self.iconClick.image = game.assets.images.button_water_click;

                self.removeEvent();
                game.flower.bindEvent("water");
                game.flowerpot.bindEvent("water");
                game.manager.enter(2);
            }
        });

        this.buttonSeed.addEventListener("click",function(){
            if(game.manager.managerNum == 3){
                game.flowerpot.removeEvent();
                self.iconObj.removeChild(self.iconClick);
                self.iconObj.removeChild(self.buttonBg);
                self.buttonSeed.image = game.assets.images.button_seed_1;
                game.manager.managerNum = 1;
            }else{
                self.buttonWater.image = game.assets.images.button_water_1;
                self.buttonSeed.image = game.assets.images.button_seed_3;
                self.buttonHand.image = game.assets.images.button_hand_1;
                self.buttonBg.x = self.buttonSeed.x;
                self.buttonBg.y = self.buttonSeed.y;
                self.iconObj.addChild(self.buttonBg);

                self.iconObj.swapChildren(self.buttonBg,self.buttonSeed);
                self.iconClick.image = game.assets.images.button_seed_3;

                self.removeEvent();
                game.flowerpot.bindEvent("flower");
                game.manager.enter(3);
            }
        });

        this.buttonHand.addEventListener("click",function(){
            if(game.manager.managerNum == 4){
                game.flowerpot.removeEvent();
                self.iconObj.removeChild(self.iconClick);
                self.iconObj.removeChild(self.buttonBg);
                self.buttonHand.image = game.assets.images.button_hand_1;
                game.manager.managerNum = 1;
            }else{
                self.buttonSeed.image = game.assets.images.button_seed_1;
                self.buttonWater.image = game.assets.images.button_water_1;
                self.buttonHand.image = game.assets.images.button_hand_3;
                self.buttonBg.x = self.buttonHand.x;
                self.buttonBg.y = self.buttonHand.y;
                self.iconObj.addChild(self.buttonBg);

                self.iconObj.swapChildren(self.buttonBg,self.buttonHand);
                self.iconClick.image = game.assets.images.button_hand_3;

                self.removeEvent();
                game.flower.bindEvent("harvest");
                game.manager.enter(4);
            }
        });

        this.buttonShop.addEventListener("click")
    }

    Gameicon.prototype.changeImgAndEnter = function(num , ){

    }
    Gameicon.prototype.removeEvent = function(){
        game.flower.removeEvent();
        game.flowerpot.removeEvent();
    }

    Gameicon.prototype.rotate = function(){
        this.buttonBg.rotation += 2;
    }
})()
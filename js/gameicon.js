(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();
        game.stage.addChild(this.iconObj);

        this.buttonSeed = new createjs.Bitmap(game.assets.images.button_seed_1);
        this.addIcon(this.buttonSeed , -40);

        this.buttonWater = new createjs.Bitmap(game.assets.images.button_water_1);
        this.addIcon(this.buttonWater , -100);

        this.buttonHand = new createjs.Bitmap(game.assets.images.button_hand_1);
        this.addIcon(this.buttonHand , -160);

        this.buttonShop = new createjs.Bitmap(game.assets.images.button_shop_1);
        this.addIcon(this.buttonShop , 40 - game.canvas.width );

        this.buttonBg = new createjs.Bitmap(game.assets.images.button_bg);
        this.buttonBg.regX = this.buttonBg.regY = 30;
        this.buttonBg.scale = 0.8;

        this.iconClick = new createjs.Bitmap();
        this.iconClick.regX = this.iconClick.regY = 30;
        this.iconClick.scale = 0.8;
        
        this.bindEvent(2 , this.buttonWater , "button_water");
        this.bindEvent(3 , this.buttonSeed , "button_seed");
        this.bindEvent(4 , this.buttonHand , "button_hand");
        this.bindEvent(5 , this.buttonShop , "button_shop");
    }

    Gameicon.prototype.addIcon = function(iconName , num){
        iconName.regX = iconName.regY = 30;
        iconName.x = game.canvas.width + (num);
        iconName.y = game.canvas.height - 35;
        iconName.scale = 0.8;
        this.iconObj.addChild(iconName);
    }

    Gameicon.prototype.update = function(){
        this.rotate();

    }

    Gameicon.prototype.bindEvent = function(num , iconName , imgName){
        var self = this;
        iconName.addEventListener("click",function(){
            if(game.manager.managerNum == num){
                self.removeEvent();
                self.iconObj.removeChild(self.iconClick);
                self.iconObj.removeChild(self.buttonBg);
                iconName.image = game.assets.images[imgName + "_1"];

                game.manager.managerNum = 1;
            }else{
                self.buttonWater.image = game.assets.images.button_water_1;
                self.buttonSeed.image = game.assets.images.button_seed_1;
                self.buttonHand.image = game.assets.images.button_hand_1;
                self.buttonShop.image = game.assets.images.button_shop_1;

                iconName.image = game.assets.images[imgName + "_3"];

                self.buttonBg.x = iconName.x;
                self.buttonBg.y = iconName.y;
                self.iconObj.addChild(self.buttonBg);

                self.iconObj.swapChildren(self.buttonBg,iconName);
                self.iconClick.image = game.assets.images.button_water_click;

                self.removeEvent();
                if(num == 2){
                    game.flower.bindEvent("water");
                    game.flowerpot.bindEvent("water");
                }else if(num == 3){
                    game.flowerpot.bindEvent("flower");
                }else if(num == 4){
                    game.flower.bindEvent("harvest");
                }

                game.manager.enter(num);
                
            }
        });
        // this.buttonWater.addEventListener("click",function(){
        //     if(game.manager.managerNum == 2){
        //         self.removeEvent();
        //         self.iconObj.removeChild(self.iconClick);
        //         self.iconObj.removeChild(self.buttonBg);
        //         self.buttonWater.image = game.assets.images.button_water_1;
        //         game.manager.managerNum = 1;
        //     }else{
        //         self.buttonWater.image = game.assets.images.button_water_3;
        //         self.buttonSeed.image = game.assets.images.button_seed_1;
        //         self.buttonHand.image = game.assets.images.button_hand_1;
        //         self.buttonShop.image = game.assets.images.button_shop_1;
        //         self.buttonBg.x = self.buttonWater.x;
        //         self.buttonBg.y = self.buttonWater.y;
        //         self.iconObj.addChild(self.buttonBg);

        //         self.iconObj.swapChildren(self.buttonBg,self.buttonWater);
        //         self.iconClick.image = game.assets.images.button_water_click;

        //         self.removeEvent();
        //         game.flower.bindEvent("water");
        //         game.flowerpot.bindEvent("water");
        //         game.manager.enter(2);
        //     }
        // });

        // this.buttonSeed.addEventListener("click",function(){
        //     if(game.manager.managerNum == 3){
        //         game.flowerpot.removeEvent();
        //         self.iconObj.removeChild(self.iconClick);
        //         self.iconObj.removeChild(self.buttonBg);
        //         self.buttonSeed.image = game.assets.images.button_seed_1;
        //         game.manager.managerNum = 1;
        //     }else{
        //         self.buttonWater.image = game.assets.images.button_water_1;
        //         self.buttonSeed.image = game.assets.images.button_seed_3;
        //         self.buttonHand.image = game.assets.images.button_hand_1;
        //         self.buttonShop.image = game.assets.images.button_shop_1;
        //         self.buttonBg.x = self.buttonSeed.x;
        //         self.buttonBg.y = self.buttonSeed.y;
        //         self.iconObj.addChild(self.buttonBg);

        //         self.iconObj.swapChildren(self.buttonBg,self.buttonSeed);
        //         self.iconClick.image = game.assets.images.button_seed_3;

        //         self.removeEvent();
        //         game.flowerpot.bindEvent("flower");
        //         game.manager.enter(3);
        //     }
        // });

        // this.buttonHand.addEventListener("click",function(){
        //     if(game.manager.managerNum == 4){
        //         game.flowerpot.removeEvent();
        //         self.iconObj.removeChild(self.iconClick);
        //         self.iconObj.removeChild(self.buttonBg);
        //         self.buttonHand.image = game.assets.images.button_hand_1;
        //         game.manager.managerNum = 1;
        //     }else{
        //         self.buttonSeed.image = game.assets.images.button_seed_1;
        //         self.buttonWater.image = game.assets.images.button_water_1;
        //         self.buttonHand.image = game.assets.images.button_hand_3;
        //         self.buttonShop.image = game.assets.images.button_shop_1;
        //         self.buttonBg.x = self.buttonHand.x;
        //         self.buttonBg.y = self.buttonHand.y;
        //         self.iconObj.addChild(self.buttonBg);

        //         self.iconObj.swapChildren(self.buttonBg,self.buttonHand);
        //         self.iconClick.image = game.assets.images.button_hand_3;

        //         self.removeEvent();
        //         game.flower.bindEvent("harvest");
        //         game.manager.enter(4);
        //     }
        // });

        // this.buttonShop.addEventListener("click" , function(){
        //     if(game.manager.managerNum == 5){
        //         game.flowerpot.removeEvent();
        //         self.iconObj.removeChild(self.iconClick);
        //         self.iconObj.removeChild(self.buttonBg);
        //         self.buttonShop.image = game.assets.images.button_shop_1;
        //         game.manager.managerNum = 1;
        //     }else{
        //         self.buttonSeed.image = game.assets.images.button_seed_1;
        //         self.buttonWater.image = game.assets.images.button_water_1;
        //         self.buttonHand.image = game.assets.images.button_hand_1;
        //         self.buttonShop.image = game.assets.images.button_shop_3;
        //         self.buttonBg.x = self.buttonShop.x;
        //         self.buttonBg.y = self.buttonShop.y;
        //         self.iconObj.addChild(self.buttonBg);

        //         self.iconObj.swapChildren(self.buttonBg,self.buttonShop);

        //         self.removeEvent();
        //         game.manager.enter(5);
        //     }
        // });
    }

    Gameicon.prototype.removeEvent = function(){
        game.flower.removeEvent();
        game.flowerpot.removeEvent();
    }

    Gameicon.prototype.rotate = function(){
        this.buttonBg.rotation += 2;
    }
})()
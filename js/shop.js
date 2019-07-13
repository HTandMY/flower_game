(function(){
    var Shop = window.Shop = function(){
        game.stage.removeChild(game.gameicon.iconObj);
        this.shopObj = new createjs.Container();
        
        this.blackBg = new createjs.Shape();
        this.blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        this.blackBg.alpha = 0.4;
        this.shopObj.addChild(this.blackBg);

        this.shopBox = new createjs.Container();
        this.shopBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 512 , game.canvas.width / 512 , 0 , 0 , 0 , 256 , 337);
        this.shopObj.addChild(this.shopBox);


        this.seedBox = new createjs.Container();
        this.decorate = new createjs.Container();
        this.exchange = new createjs.Container();

        this.shopBg = new createjs.Bitmap(game.assets.images.shop_bg);
        this.shopBox.addChild(this.shopBg);

        this.shopWord = new createjs.Bitmap(game.assets.images.shop_word);
        this.itemBg = new createjs.Bitmap(game.assets.images.shop_bg_1);

        this.shopWord.regX = 60;
        this.shopWord.x = 512 / 2;
        this.shopWord.y = 95;

        var self = this;
        this.addIcon("buttonClose" , "button_close" , 18 , 512 - 100 , 95 , function(){game.manager.enter(1)});
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 512 / 2 - 120 , 150 , function(){self.changeBg(1)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 512 / 2 , 150 , function(){self.changeBg(2)});
        this.addIcon("buttonExchange" , "shop_bg_button_3" , 60 , 512 / 2 + 120 , 150 , function(){self.changeBg(3)});

        this.itemBg.regX = 180;
        this.itemBg.x = 512 / 2;
        this.itemBg.y = 190;

        this.shopBox.addChild(this.shopWord , this.itemBg);
    }
    Shop.prototype.addIcon = function(iconName , imgURL , regX , x , y , callback){
        this[iconName] = new createjs.Bitmap(game.assets.images[imgURL]);
        this[iconName].regX = regX;
        this[iconName].x = x;
        this[iconName].y = y;
        this[iconName].addEventListener("click",function(){
            callback();
        });
        this.shopBox.addChild(this[iconName]);
    }
    Shop.prototype.changeBg = function(imgUrl){
        this.itemBg.image = game.assets.images["shop_bg_" + imgUrl];
    }

    Shop.prototype.close = function(){
        if(game.manager.managerNum == 5){
            game.stage.removeEvent(this.shopObj);
            game.manager.enter(1);
        }
    }
})()
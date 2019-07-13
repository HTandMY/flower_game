(function(){
    var Shop = window.Shop = function(){
        game.stage.removeChild(game.gameicon.iconObj);
        this.shopObj = new createjs.Container();
        game.stage.addChild(this.shopObj);
        
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
        this.shopWord = new createjs.Bitmap(game.assets.images.shop_word);
        this.buttonClose = new createjs.Bitmap(game.assets.images.button_close);

        this.shopBox.addChild(this.shopBg , this.buttonClose , this.shopWord);
        
        var boxSize = this.shopBox.getBounds();

        this.buttonClose.x = boxSize.width - 115;
        this.buttonClose.y = 100;
        this.buttonClose.addEventListener("click",function(){
            game.manager.enter(1);
        });

        this.shopWord.regX = 60;
        this.shopWord.regY = 20;
        this.shopWord.x = boxSize.width / 2;
        this.shopWord.y = 120;
    }

    Shop.prototype.close = function(){
        if(game.manager.managerNum == 5){
            game.stage.removeEvent(this.shopObj);
            game.manager.enter(1);
        }
    }
})()
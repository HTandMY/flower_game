(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();
        game.stage.addChild(this.iconObj);

        this.buttonwater = new createjs.Bitmap(game.assets.images.button_2);
        this.buttonwater.x = game.canvas.width - 70;
        this.buttonwater.y = game.canvas.height - 70;
        this.iconObj.addChild(this.buttonwater);

        this.buttonseed = new createjs.Bitmap(game.assets.images.button_3);
        this.buttonseed.x = game.canvas.width - 140;
        this.buttonseed.y = game.canvas.height - 70;
        this.iconObj.addChild(this.buttonseed);

        this.iconclick = new createjs.Bitmap();

        this.bindEvent();
    }

    Gameicon.prototype.update = function(){
        this.iconclick.x = game.stage.mouseX;
        this.iconclick.y = game.stage.mouseY;
    }

    Gameicon.prototype.bindEvent = function(){
        var self = this;
        this.buttonwater.addEventListener("click",function(event){
            if(game.manager.managerNum == 2){
                self.removeEvent();
                self.iconObj.removeChild(self.iconclick);
                game.manager.managerNum = 1;
            }else{
                self.iconclick.image = game.assets.images.button_1_1;
                self.iconclick.regX = 30;
                self.iconclick.regY = 30;
                self.iconclick.x = game.stage.mouseX;
                self.iconclick.y = game.stage.mouseY;
                self.iconObj.addChild(self.iconclick);
                self.removeEvent();
                game.flower.bindEvent("water");
                game.flowerpot.bindEvent("water");
                game.manager.enter(2);
            }
        });

        this.buttonseed.addEventListener("click",function(event){
            if(game.manager.managerNum == 3){
                game.flowerpot.removeEvent();
                self.iconObj.removeChild(self.iconclick);
                game.manager.managerNum = 1;
            }else{
                self.iconclick.image = game.assets.images.button_seed_1;
                self.iconclick.regX = 24;
                self.iconclick.regY = 24;
                self.iconclick.x = game.stage.mouseX;
                self.iconclick.y = game.stage.mouseY;
                self.iconObj.addChild(self.iconclick);
                self.removeEvent();
                game.flowerpot.bindEvent("flower");
                game.manager.enter(3);
            }
        });

    }
    Gameicon.prototype.removeEvent = function(){
        game.flower.removeEvent();
        game.flowerpot.removeEvent();
    }
})()
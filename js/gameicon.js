(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();
        game.stage.addChild(this.iconObj);
        this.icon = new createjs.Bitmap(game.assets.images.button_water);
        this.icon.setTransform(0,0,0.75,0.75);
        this.iconObj.addChild(this.icon);
        this.icon.x = game.canvas.width - 70;
        this.icon.y = game.canvas.height - 70;
        var self = this;
        this.icon.addEventListener("click",function(event){
            if(game.manager.managerNum == 1){
                self.iconclick = new createjs.Bitmap(game.assets.images.button_water_1);
                self.iconObj.addChild(self.iconclick);
                self.iconclick.regX = 24;
                self.iconclick.regY = 24;
                self.iconclick.x = game.stage.mouseX;
                self.iconclick.y = game.stage.mouseY;
                game.flowerpot.bindEvent();
                game.manager.enter(2);
            }else{
                game.flowerpot.removeEvent();
                self.iconObj.removeChild(self.iconclick);
                game.manager.managerNum = 1;
            }
        });
    }

    Gameicon.prototype.update = function(){
        this.iconclick.x = game.stage.mouseX;
        this.iconclick.y = game.stage.mouseY;
    }
})()
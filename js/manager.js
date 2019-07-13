(function(){
    var Manager = window.Manager = function(){
        this.managerNum = 1;
        this.enter(1);
        this.nowManager = new createjs.Text("","15px sans-serif","");
        game.stage.addChild(this.nowManager);
        this.nowManager.x = this.nowManager.y = 10;
    }
    
    Manager.prototype.enter = function(number){
        var self = this;
        self.managerNum = number;
        switch (this.managerNum) {
            case 1:
                game.stage.removeAllChildren();

                game.background = new Background();
                game.flowerpot = new Flowerpot();
                game.flower = new Flower();
                game.gameicon = new Gameicon();

                game.stage.addChild(this.nowManager);

                game.flowerpot.removeEvent();
                game.flower.removeEvent();
            break;
            case 2:
                game.flowerpot.removeEvent();
                game.flower.removeEvent();
                game.flowerpot.bindEvent("flower");
            break;
            case 3:
                game.flowerpot.removeEvent();
                game.flower.removeEvent();
                game.flowerpot.bindEvent("water");
                game.flower.bindEvent("water");
            break;
            case 4:
                game.flowerpot.removeEvent();
                game.flower.removeEvent();
                game.flower.bindEvent("harvest");
            break;
            case 5:
                game.flowerpot.removeEvent();
                game.flower.removeEvent();
                game.shop = new Shop();
            break;
        }
    }

    Manager.prototype.update = function(){
        this.nowManager.text = this.managerNum;
        switch (this.managerNum) {
            case 1:
                game.flower.update();
            break;
            case 2:
                game.flower.update();
                game.gameicon.rotate();
            break;
            case 3:
                game.flower.update();
                game.gameicon.rotate();
            break;
            case 4:
                game.flower.update();
                game.gameicon.rotate();
            break;
            case 5:
                game.flower.update();
            break;

        }
    }
})()
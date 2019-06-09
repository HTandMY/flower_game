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
                game.background = new Background();
                game.flowerpot = new Flowerpot();
                game.gameicon = new Gameicon();
            break;
            case 2:
                
            break;
        }
    }

    Manager.prototype.update = function(){
        this.nowManager.text = this.managerNum;
        switch (this.managerNum) {
            case 1:
                game.flowerpot.update();
            break;
            case 2:
                game.flowerpot.update();
                game.gameicon.update()
            break;
        }
    }
})()
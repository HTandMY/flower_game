(function(){
    var Manager = window.Manager = function(){
        this.managerNum = 1;
        this.enter(1);
    }
    Manager.prototype.enter = function(number){
        var self = this;
        self.managerNum = number;
        switch (this.managerNum) {
            case 1:
                game.background = new Background();
                game.background.bg.addEventListener("click",function(){
                    console.log("点击了1");
                    game.stage.removeChild(game.background.bg);
                    self.enter(2);
                });
            break;
            case 2:
                game.flowerpot = new Flowerpot();
                
            break;
        }
    }
    Manager.prototype.render = function(){
        switch (this.managerNum) {
            case 1:
                game.background.render();
            break;
            case 2:
                
            break;
        }
    }
    Manager.prototype.update = function(){
        switch (this.managerNum) {
            case 1:
                
            break;
            case 2:
                
            break;
        }
    }
})()
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
            break;
        }
    }
    Manager.prototype.render = function(){
        switch (this.managerNum) {
            case 1:
                game.background.render();
            break;
        }
    }
    Manager.prototype.update = function(){
        switch (this.managerNum) {
            case 1:
                game.background.update();
                game.stage.update();
            break;
        }
    }
})()
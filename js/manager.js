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
                game.flowerpot = new Flowerpot();
            break;
            case 2:

            break;
        }
    }

    Manager.prototype.update = function(){
        switch (this.managerNum) {
            case 1:
                game.flowerpot.update();
            break;
            case 2:
                
            break;
        }
    }
})()
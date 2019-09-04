(function(){
    var Manager = window.Manager = function(){
        game.background = new Background();
        game.flowerpot = new Flowerpot();
        game.flower = new Flower();
        game.gameicon = new Gameicon();
        game.depository = new Depository();
        game.shop = new Shop();
        game.settings = new Settings();
        game.illustrate = new Illustrate();
        game.player = new PlayerData();
        game.alarm = new Alarm();
        this.managerNum = 1;
        this.nowManager = new createjs.Text("","15px UDDigiKyokashoN","").set({
            x : 10,
            y : 10
        });
        game.stage.addChild(game.background.bgObj , game.flowerpot.fpObj , game.flower.fwObj , game.gameicon.iconObj , game.settings.settingsObj , game.player.playerDataObj , game.depository.depositoryObj , game.shop.shopObj , game.illustrate.illustrateObj , game.alarm.alarmObj , this.nowManager );
        this.enter(1);
    }
    
    Manager.prototype.enter = function(number){
        var self = this;
        self.managerNum = number;
        game.flowerpot.removeEvent();
        game.flower.removeEvent();
        game.settings.settingsObj.visible = false;
        switch (this.managerNum) {
            case 1:
                game.settings.settingsObj.visible = true;
                game.shop.shopObj.visible = false;
                game.depository.depositoryObj.visible = false;
                game.illustrate.illustrateObj.visible = false;
                game.alarm.alarmObj.visible = false;
            break;
            case 2:
                game.depository.open();
            break;
                case 2.5:
                    game.gameicon.iconObj.visible = false;
                    game.flowerpot.addArrow();
                break;
            case 3:
                game.flowerpot.bindEvent("water");
                game.flower.bindEvent("water");
            break;
            case 4:
                game.flower.bindEvent("harvest");
            break;
            case 5:
                game.shop.open();
            break;
            case 6:
                game.illustrate.open();
            break;
            case 7:
                game.gameicon.iconObj.visible = false;
                game.flowerpot.addArrow();
            break;
        }
    }

    Manager.prototype.update = function(){
        this.nowManager.text = this.managerNum;
        game.flower.update();
        game.player.update();
        game.settings.update();
        game.alarm.update();
        switch (this.managerNum) {
            case 1:
                
            break;
            case 2:
                game.depository.update();
            break;
                case 2.5:
                    game.flowerpot.arrowMove();
                break;
            case 3:
                game.gameicon.rotate();
            break;
            case 4:
                game.gameicon.rotate();
            break;
            case 5:
                game.shop.update();
            break;
            case 6:
                game.illustrate.update();
            break;
            case 7:
                game.flowerpot.arrowMove();
            break;
        }
    }
})()
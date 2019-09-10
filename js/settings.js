(function(){
    var Settings = window.Settings = function(){
        var self = this;
        this.settingsObj = new createjs.Container();

        this.state = false;
        this.openState = false;
        this.closeState = false;

        this.SettingsIcon = new createjs.Bitmap(game.assets.images.button_gear).set({
            x : game.canvas.width - 30,
            y : 30,
            regX : 16,
            regY : 16
        });
        this.SettingsIcon.addEventListener("click" , function(){
            self.changeState();
        });
        this.settingsObj.addChild(this.SettingsIcon);

        this.settingsBg = new createjs.Bitmap(game.assets.images.setting_bg);
        this.settingsBg.shadow = new createjs.Shadow("#aaaaaa", 0, 0, 4);

        this.settingsMenu = new createjs.Container().set({
            x : game.canvas.width - 110,
            y : 55,
            scaleY : 0,
            visible : false
        });
        this.settingsMenu.addChild(this.settingsBg);
        this.settingsObj.addChild(this.settingsMenu);

        this.addText("zukan" , "図  鑑" , 18 , function(){
            console.log("図  鑑");
            game.sounds.playSound_1("open");
            self.changeState();
            game.manager.enter(6);
        });
        this.addText("alarm" , "アラーム" , 62 , function(){
            game.sounds.playSound_1("open");
            console.log("アラーム");
            self.changeState();
            game.alarm.setOpen();
        });
        this.addText("logout" , "ログアウト" , 104 , function(){
            game.sounds.stopAll();
            console.log("ログアウト");
            self.logOut();
        });
    }

    Settings.prototype.addText = function(name ,text , y , doSome){
        let hit1 = new createjs.Shape();
        hit1.graphics.beginFill("#555").drawRect(-50, -10, 100, 40);
        this[name] = new createjs.Text(text ,"16px UDDigiKyokashoN","#5c190f").set({
            textAlign : "center",
            x : 50,
            y : y,
            hitArea : hit1,
        });
        this.settingsMenu.addChild(this[name]);
        this[name].addEventListener("click",function(){
            doSome();
        });
    }

    Settings.prototype.logOut = function(){
        login.loginBox.style.display = "block";
        login.gameBox.style.display = "none";
        createjs.Ticker.removeAllEventListeners();
        login.userId = "";
        game.stage.removeAllChildren();
        delete game.background;
        delete game.flowerpot;
        delete game.flower;
        delete game.gameicon;
        delete game.depository;
        delete game.shop;
        delete game.settings;
        delete game.illustrate;
        delete game.player;
        delete game.manager;
        delete game.sounds;
        delete game;
    }

    Settings.prototype.changeState = function(){
        this.state = !this.state;
        if(this.state){
            this.settingsMenu.visible = true;
            this.closeState = false;
            this.openState = true;
        }else{
            this.openState = false;
            this.closeState = true;
        }
    }

    Settings.prototype.update = function(){
        if(this.openState){
            this.settingsMenu.scaleY += 0.2;
            this.SettingsIcon.rotation += 19;
            if(this.settingsMenu.scaleY >= 1){
                this.openState = false;
                this.settingsMenu.scaleY = 1;
            }
        }
        if(this.closeState){
            this.settingsMenu.scaleY -= 0.2;
            this.SettingsIcon.rotation -= 19;
            if(this.settingsMenu.scaleY <= 0){
                this.closeState = false;
                this.settingsMenu.scaleY = 0
                this.settingsMenu.visible = false;
            }
        }
    }
})()
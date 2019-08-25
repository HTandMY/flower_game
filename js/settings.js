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

        this.settingsBg = new createjs.Shape();
        this.settingsBg.graphics.beginFill("white").drawRoundRect(0,0,100,150,10);
        this.settingsBg.shadow = new createjs.Shadow("#aaaaaa", 0, 0, 4);

        this.settingsMenu = new createjs.Container().set({
            x : game.canvas.width - 110,
            y : 55,
            scaleY : 0,
            visible : false
        });
        this.settingsMenu.addChild(this.settingsBg);
        this.settingsObj.addChild(this.settingsMenu);

        this.addText("zukan" , "図  鑑" , 20 , function(){
            console.log("図  鑑");
            self.changeState();
            game.manager.enter(6);
        });
        this.addText("alarm" , "アラーム" , 65 , function(){
            console.log("アラーム");
        });
        this.addText("logout" , "ログアウト" , 110 , function(){
            console.log("ログアウト");
        });
    }

    Settings.prototype.addText = function(name ,text , y , doSome){
        let hit1 = new createjs.Shape();
        hit1.graphics.beginFill("#555").drawRect(-50, -10, 100, 40);
        this[name] = new createjs.Text(text ,"16px UDDigiKyokashoN","").set({
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
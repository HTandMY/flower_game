(function(){
    var PlayerData = window.PlayerData = function(){
        var self = this;

        this.playerDataObj = new createjs.Container().set({
            scaleX : game.canvas.width / 580,
            scaleY : game.canvas.width / 580,
            x : 2,
            y : 2,
        });

        this.playerDataBg = new createjs.Bitmap(game.assets.images["player_bg_" + game.playerObj.level]);
        this.expBg = new createjs.Bitmap(game.assets.images.player_exp).set({
            x : 86,
            y : 58
        });
        this.name = new createjs.Text(game.playerObj.playername ,"20px UDDigiKyokashoN","").set({
            x : 90,
            y : 35,
        });
        this.level = new createjs.Text("Lv" + game.playerObj.level ,"18px UDDigiKyokashoN","#ffffff").set({
            x : 232,
            y : 24,
        });
        this.exp = new createjs.Text(game.playerObj.exp + "/" + game.gameObj.levelData[game.playerObj.level - 1] ,"15px UDDigiKyokashoN","#ffffff").set({
            textAlign : "center",
            x : 180,
            y : 59,
        });
        this.money = new createjs.Text(game.playerObj.money ,"18px UDDigiKyokashoN","#ffffff").set({
            textAlign : "right",
            x : 165,
            y : 96,
        });
        this.crystal = new createjs.Text(game.playerObj.crystal ,"18px UDDigiKyokashoN","#ffffff").set({
            textAlign : "right",
            x : 275,
            y : 96,
        });


        this.playerDataObj.addChild(this.playerDataBg , this.expBg , this.name , this.level , this.money , this.crystal , this.exp);
    }

    PlayerData.prototype.update = function(){
        this.name.text = game.playerObj.playername;
        this.level.text = "Lv" + game.playerObj.level;
        this.exp.text = game.playerObj.exp + "/" + game.gameObj.levelData[game.playerObj.level - 1];
        this.money.text = game.playerObj.money;
        this.crystal.text = game.playerObj.crystal;
        if(game.playerObj.exp == 0){
            this.expBg.scaleX = 0
        }else{
            this.expBg.scaleX = game.playerObj.exp / game.gameObj.levelData[game.playerObj.level - 1];
        }
        
    }
})()
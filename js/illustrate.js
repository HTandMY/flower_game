(function(){
    var Illustrate = window.Illustrate = function(){
        var self = this;

        this.openState = false;
        this.closeState = false;

        this.illustrateObj = new createjs.Container().set({
            alpha : 0,
            scale : 0.55,
            regX : game.canvas.width / 2,
            regY : game.canvas.height / 2,
            x : game.canvas.width / 2,
            y : game.canvas.height / 2,
            visible : false
        });

        var blackBg = new createjs.Shape();
        blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        blackBg.alpha = 0.4;
        blackBg.addEventListener("click",function(){});
        this.illustrateObj.addChild(blackBg);

        this.illustrateBox = new createjs.Container();
        this.illustrateBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 460 , game.canvas.width / 460 , 0 , 0 , 0 , 220 , 320);
        this.illustrateObj.addChild(this.illustrateBox);
        
        this.illustrateBg_1 = new createjs.Bitmap(game.assets.images.illustrate_bg_1);
        this.illustrateBg_2 = new createjs.Bitmap(game.assets.images.illustrate_bg_2).set({
            x : 45,
            y : 125
        });
        this.illustrateBg_3 = new createjs.Bitmap(game.assets.images.illustrate_bg_3).set({
            x : 45,
            y : 125
        });
        this.title = new createjs.Bitmap(game.assets.images.illustrate_word).set({
            regX : 36,
            x : 220,
            y : 50
        });
        this.border = new createjs.Bitmap(game.assets.images.illustrate_border).set({
            x : 190,
            y : 435
        });
        this.buttonClose = new createjs.Bitmap(game.assets.images.button_close).set({
            regX : 18,
            x : 380,
            y : 40
        });
        
        this.flowerIcon = new createjs.Bitmap().set({
            regX : 43,
            x : 290,
            y : 130
        });
        this.flowerText = new createjs.Text("" ,"15px UDDigiKyokashoN","#000000").set({
            x : 195,
            y : 230,
            lineWidth : 190,
            lineHeight : 20
        });;
        this.flowerWord = new createjs.Text("" ,"16px UDDigiKyokashoN","#ffffff").set({
            x : 205,
            y : 470,
            lineWidth : 160,
            lineHeight : 24
        });

        this.buttonClose.addEventListener("click" , function(){
            self.closeState = true;
        })

        this.illustrateBox.addChild(this.illustrateBg_1 , this.illustrateBg_2 , this.illustrateBg_3 , this.title , this.border , this.flowerIcon , this.flowerText , this.flowerWord , this.buttonClose);
        this.addButton();
        this.changePage(0);
    }

    Illustrate.prototype.addButton = function(){
        var self = this;
        this.button = []
        for(let i = 0 ; i < game.gameObj.plantData.length ; i++){
            this.button[i] = new createjs.Bitmap(game.assets.images.button_orange)
            this.button[i].x = 55;
            this.button[i].y = 135 + i * 47;
            this.button[i].addEventListener("click" , function(){
                self.changePage(i);
            });
            var text = new createjs.Text(game.gameObj.plantData[i].jpname ,"14px UDDigiKyokashoN","#000000");
            text.textAlign = "center";
            text.x = this.button[i].x + 53;
            text.y = this.button[i].y + 11;
            this.illustrateBox.addChild(this.button[i] , text);
        }
    }
    
    Illustrate.prototype.changePage = function(num){
        for(let i = 0 ; i < game.gameObj.plantData.length ; i++){
            this.button[i].image = game.assets.images.button_orange;
        }
        this.button[num].image = game.assets.images.button_brown;
        this.flowerIcon.image = game.assets.images["flower_" + game.gameObj.plantData[num].name + "_ball"];
        this.flowerText.text = "花名：" + game.gameObj.plantData[num].jpname + "\n" +
                               "成長時間：" + game.gameObj.plantData[num].time + "秒\n" +
                               "購入：欠片" + game.gameObj.plantData[num].buy + "個\n" +
                               "放す：欠片" + game.gameObj.plantData[num].sell + "個\n" +
                               game.gameObj.plantData[num].discription;
        this.flowerWord.text = game.gameObj.plantData[num].flowerword;
    }

    Illustrate.prototype.open = function(){
        this.illustrateObj.visible = true;
        this.openState = true;
    }

    Illustrate.prototype.update = function(){
        if(this.openState == true){
            this.illustrateObj.alpha += 0.2;
            this.illustrateObj.scale = Number((this.illustrateObj.scale + 0.12).toFixed(2));
            if(this.illustrateObj.alpha >= 1){
                this.illustrateObj.scale = 1;
                this.openState = false;
            }
        }
        if(this.closeState == true){
            this.illustrateObj.alpha -= 0.2;
            this.illustrateObj.scale = Number((this.illustrateObj.scale - 0.1).toFixed(2));
            if(this.illustrateObj.alpha <= 0){
                this.illustrateObj.alpha = 0;
                this.illustrateObj.scale = 0.55;
                this.illustrateObj.visible = false;
                this.closeState = false;
                game.manager.enter(1);
            }
        }
    }

})()
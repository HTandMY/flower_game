(function(){
    var Background = window.Background = function(){
        this.bgObj = new createjs.Container();
        
        this.bg = new createjs.Bitmap(game.assets.images[game.gameObj.decorationData[game.playerObj.wallpaper].itemname]);
        this.bg.setTransform(0,0,game.canvas.width/1080,game.canvas.height/1920);
        this.bgObj.addChild(this.bg);
        this.bg.addEventListener("click",function(){
            game.flowerpot.timeObj.visible = false;
        });
        var y = game.canvas.height / 4;
        for (let i = 0; i < 3; i++) {
            this.wood_1 = new createjs.Bitmap(game.assets.images.wood_1);

            if(game.canvas.width > 768){
                this.wood_1.setTransform(game.canvas.width / 2, y + y * i + 5 ,(768 - 40) / 490 , 0.8);
            }else{
                this.wood_1.setTransform(game.canvas.width / 2, y + y * i + 5 ,(game.canvas.width - 40) / 490 , 0.8);
            }
            
            this.wood_1.regX = 245;
            this.bgObj.addChild(this.wood_1);
        }

    }
})()
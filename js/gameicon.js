(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();

        this.buttonBg = new createjs.Bitmap();
        this.buttonBg.regX = this.buttonBg.regY = 30;
        this.buttonBg.scale = 0.8;
        this.iconObj.addChild(this.buttonBg);

        this.addIcon("button_storehouse_" , "button_storehouse_" , -40 , 2);
        this.addIcon("waterIcon" , "button_water_" , -100 , 3);
        this.addIcon("handIcon" , "button_hand_" , -160 , 4);
        this.addIcon("shopIcon" , "button_shop_" , -game.canvas.width + 40 , 5);
    }
    

    Gameicon.prototype.addIcon = function(iconName , imgURL , x , goManagerNum){
        this[iconName] = new createjs.Bitmap(game.assets.images[imgURL + "1"]);
        this[iconName].regX = this[iconName].regY = 30;
        this[iconName].x = game.canvas.width + (x);
        this[iconName].y = game.canvas.height - 35;
        this[iconName].scale = 0.8;
        this[iconName].name = imgURL;
        var self = this;
        this[iconName].addEventListener("click",function(){
            self.clicked(iconName , imgURL , goManagerNum);
        });
        this.iconObj.addChild(this[iconName]);
    }


    Gameicon.prototype.clicked = function(iconName , imgURL , goManagerNum){
        if(goManagerNum != 5){
            for(let i = 0 ; i < this.iconObj.children.length ; i++){
                this.iconObj.children[i].image = game.assets.images[this.iconObj.children[i].name + "1"];
            }
            if(game.manager.managerNum != goManagerNum){
                this.buttonBg.image = game.assets.images.button_bg;
                this.buttonBg.x = this[iconName].x;
                this.buttonBg.y = this[iconName].y;
                this[iconName].image = game.assets.images[imgURL + "3"];
                game.manager.enter(goManagerNum);
            }else{
                this.buttonBg.image = null;
                this[iconName].image = game.assets.images[imgURL + "1"];
                game.manager.enter(1);
            }
        }else{
            for(let i = 0 ; i < this.iconObj.children.length ; i++){
                this.iconObj.children[i].image = game.assets.images[this.iconObj.children[i].name + "1"];
            }
            game.stage.removeChild(this.iconObj)
            game.manager.enter(goManagerNum);
        }
    }

    Gameicon.prototype.rotate = function(){
        this.buttonBg.rotation += 2;
    }
})()
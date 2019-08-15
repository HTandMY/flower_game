(function(){
    var Gameicon = window.Gameicon = function(){
        this.iconObj = new createjs.Container();

        this.buttonBg = new createjs.Bitmap();
        this.buttonBg.regX = this.buttonBg.regY = 30;
        this.buttonBg.scale = 0.8;
        this.iconObj.addChild(this.buttonBg);

        this.addIcon("depository" , "button_storehouse_1" , -40 , true , "button_storehouse_3" , 2);
        this.addIcon("waterIcon" , "button_water_1" , -100 , true , "button_water_3" , 3);
        this.addIcon("handIcon" , "button_hand_1" , -160 , true , "button_hand_3" , 4);
        this.addIcon("shopIcon" , "button_shop_1" , -game.canvas.width + 40 , true , "button_shop_3" , 5);
    }

    Gameicon.prototype.addIcon = function(iconName , imgURL_1 , x , haveListener , imgURL_2 , goManagerNum){
        this[iconName] = new createjs.Bitmap(game.assets.images[imgURL_1]);
        this[iconName].regX = this[iconName].regY = 30;
        this[iconName].x = game.canvas.width + (x);
        this[iconName].y = game.canvas.height - 35;
        this[iconName].scale = 0.8;
        this[iconName].name = imgURL_1;
        if(haveListener){
            var self = this;
            this[iconName].addEventListener("click",function(){
                self.clicked(iconName , imgURL_1 , imgURL_2 , goManagerNum);
            });
        }
        this.iconObj.addChild(this[iconName]);
    }


    Gameicon.prototype.clicked = function(iconName , imgURL_1 , imgURL_2 , goManagerNum){
        if(goManagerNum == 5 || goManagerNum == 2){
            for(let i = 0 ; i < this.iconObj.children.length ; i++){
                this.iconObj.children[i].image = game.assets.images[this.iconObj.children[i].name];
            }
            game.manager.enter(goManagerNum);
        }else{
            for(let i = 0 ; i < this.iconObj.children.length ; i++){
                this.iconObj.children[i].image = game.assets.images[this.iconObj.children[i].name];
            }
            if(game.manager.managerNum != goManagerNum){
                this.buttonBg.image = game.assets.images.button_bg;
                this.buttonBg.x = this[iconName].x;
                this.buttonBg.y = this[iconName].y;
                this[iconName].image = game.assets.images[imgURL_2];
                game.manager.enter(goManagerNum);
            }else{
                this.buttonBg.image = undefined;
                this[iconName].image = game.assets.images[imgURL_1];
                game.manager.enter(1);
            }
        }
    }

    Gameicon.prototype.rotate = function(){
        this.buttonBg.rotation += 2;
    }
})()
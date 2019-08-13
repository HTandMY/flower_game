(function(){
    var Depository = window.Depository = function(){
        var self = this;

        //打开关闭状态开关
        this.openState = false;
        this.closeState = false;
        
        //创建商店全体框架
        this.depositoryObj = new createjs.Container();
        this.depositoryObj.alpha = 0;
        this.depositoryObj.scale = 0.55;
        this.depositoryObj.regX = this.depositoryObj.x = game.canvas.width / 2;
        this.depositoryObj.regY = this.depositoryObj.y = game.canvas.height / 2;
        //创建黑色背景
        var blackBg = new createjs.Shape();
        blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        blackBg.alpha = 0.4;
        this.depositoryObj.addChild(blackBg);
        
        //创建商店内容框架
        this.depositoryBox = new createjs.Container();
        this.depositoryBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 500 , game.canvas.width / 500 , 0 , 0 , 0 , 212.5 , 350);
        this.depositoryObj.addChild(this.depositoryBox);
        //商店背景、文字、按钮、标签
        this.addIcon("shopBg" , "depository_bg");
        this.addIcon("shopWord" , "depository_word" , 60 , 425 / 2 , 115);
        this.addIcon("buttonClose" , "button_close" , 18 , 425 - 60 , 115 , true , function(){self.closeState = true});
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 425 / 2 - 120 , 170 , true , function(){self.changePage(1)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 425 / 2 , 170 , true , function(){self.changePage(2)});
        this.addIcon("buttonExchange" , "depository_bg_button_3" , 60 , 425 / 2 + 120 , 170 , true , function(){self.changePage(3)});
        this.addIcon("itemBg" , "shop_bg_1" , 180 , 425 / 2 , 210 ,false);
        //插入道具框架
        this.itemBox = new createjs.Container();
        this.depositoryBox.addChild(this.itemBox);
        self.changePage(1);
    }
 
    //添加图标方法
    Depository.prototype.addIcon = function(iconName , imgURL , regX , x , y , isHave , callback){
        this[iconName] = new createjs.Bitmap(game.assets.images[imgURL]).set({regX:regX , x:x , y:y});
        if(isHave){
            this[iconName].addEventListener("click",function(){
                callback();
            });
        }
        this.depositoryBox.addChild(this[iconName]);
    }

    //翻页方法
    Depository.prototype.changePage = function(clickNum){
        
        this.nowPage = 1;

        switch(clickNum){
            case 1:
                this.itemBg.image = game.assets.images.shop_bg_1;
                this.itemNum = game.playerObj.depository.seed.length;
                this.allPage = Math.ceil(this.itemNum / 6);
            break;
            case 2:
                this.itemBg.image = game.assets.images.shop_bg_2;
                this.itemNum = game.playerObj.depository.ornament.length;
                this.allPage = Math.ceil(this.itemNum / 6);
            break;
            case 3:
                this.itemBg.image = game.assets.images.shop_bg_3;
                this.itemNum = game.playerObj.depository.exchange.length;
                this.allPage = Math.ceil(this.itemNum / 6);
            break;
        }
    }

    Depository.prototype.updatePageContent = function(){

        var state;
        this.itemBox.removeAllChildren();
        if(this.nowPage == 1 && this.allPage == 1){
            state = 0;
        }else if(this.nowPage == 1 && this.allPage > 1){
            state = 1;
        }else if(this.nowPage != 1 && this.nowPage != this.allPage){
            state = 2;
        }else{
            state = 3;
        }

        switch(state){
            //道具为6个以下
            case 0:
                for(let i = 0; i < self.itemNum ; i++){

                }
            break;
            //道具数量为6个以上，第一页
            case 1:

            break;
            //道具数量为6个以上，中间页
            case 2:

            break;
            //道具数量为6个以上，最后页
            case 3:

            break;
        }
    }

    Depository.prototype.addItem = function(){
        var j = 0;
        var k = 0;
    }

    Depository.prototype.open = function(){
        game.stage.removeChild(game.gameicon.iconObj);
        game.stage.addChild(this.depositoryObj);
        this.openState = true;
    }

    Depository.prototype.update = function(){
        if(this.openState){
            this.depositoryObj.alpha += 0.2;
            this.depositoryObj.scale = Number((this.depositoryObj.scale + 0.12).toFixed(2));
            if(this.depositoryObj.alpha >= 1){
                this.depositoryObj.scale = 1;
                this.openState = false;
            }
        }
        if(this.closeState){
            this.depositoryObj.alpha -= 0.2;
            this.depositoryObj.scale = Number((this.depositoryObj.scale - 0.1).toFixed(2));
            if(this.depositoryObj.alpha <= 0){
                this.depositoryObj.alpha = 0;
                this.depositoryObj.scale = 0.55;
                this.closeState = false;
                game.manager.enter(1);
            }
        }
    }
})()
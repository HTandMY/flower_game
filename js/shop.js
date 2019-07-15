(function(){
    var Shop = window.Shop = function(){
        game.stage.removeChild(game.gameicon.iconObj);
        
        //创建商店全体框架
        this.shopObj = new createjs.Container();
        
        //创建黑色背景
        this.blackBg = new createjs.Shape();
        this.blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        this.blackBg.alpha = 0.4;
        this.shopObj.addChild(this.blackBg);
        
        //创建商店内容框架
        this.shopBox = new createjs.Container();
        this.shopBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 512 , game.canvas.width / 512 , 0 , 0 , 0 , 256 , 337);
        this.shopObj.addChild(this.shopBox);

        //商店背景、文字、按钮、标签
        var self = this;
        this.addIcon("shopBg" , "shop_bg");
        this.addIcon("shopWord" , "shop_word" , 60 , 512 / 2 , 95 , false);
        this.addIcon("buttonClose" , "button_close" , 18 , 512 - 100 , 95 , true , function(){game.manager.enter(1)});
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 512 / 2 - 120 , 150 , true , function(){self.changeBg(1);self.changePage(1)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 512 / 2 , 150 , true , function(){self.changeBg(2);;self.changePage(2)});
        this.addIcon("buttonExchange" , "shop_bg_button_3" , 60 , 512 / 2 + 120 , 150 , true , function(){self.changeBg(3);;self.changePage(3)});
        this.addIcon("itemBg" , "shop_bg_1" , 180 , 512 / 2 , 190 ,false);
        //插入道具框架
        this.itemBox = new createjs.Container();
        this.shopBox.addChild(this.itemBox);

        this.changePage(1);
    }

    Shop.prototype.addIcon = function(iconName , imgURL , regX , x , y , isHave , callback){
        this[iconName] = new createjs.Bitmap(game.assets.images[imgURL]);
        this[iconName].regX = regX;
        this[iconName].x = x;
        this[iconName].y = y;
        if(isHave){
            this[iconName].addEventListener("click",function(){
                callback();
            });
        }
        this.shopBox.addChild(this[iconName]);
    }

    Shop.prototype.changeBg = function(imgUrl){
        switch(imgUrl){
            case 1:
                this.itemBg.image = game.assets.images["shop_bg_" + imgUrl];
            break;
            case 2:
                this.itemBg.image = game.assets.images["shop_bg_" + imgUrl];
            break;
            case 3:
                this.itemBg.image = game.assets.images["shop_bg_" + imgUrl];
            break;
        }
        
    }

    Shop.prototype.changePage = function(clickNum){
        this.itemBox.removeAllChildren();
        this.itemNum = game.gameObj.itemNum;
        this.state = 0;
        this.allPage = Math.ceil(this.itemNum / 6);
        this.nowPage = 1;
        switch(clickNum){
            case 1:
                this.addItem(clickNum);
            break;
            case 2:
                this.addItem(clickNum);
            break;
            case 3:

            break;
        }
    }

    Shop.prototype.addItem = function(clickNum){
        this.itemBox.removeAllChildren();
        if(this.nowPage == 1 && this.allPage == 1){
            this.state = 0;
            this.allPage = Math.ceil(this.itemNum / 6);
        }else if(this.nowPage == 1 && this.allPage > 1){
            this.state = 1;
            this.allPage = Math.ceil(this.itemNum / 6);
        }else if(this.nowPage != 1 && this.nowPage != this.allPage){
            this.state = 2;
            this.allPage = Math.ceil(this.itemNum / 6);
        }else{
            this.state = 3;
            this.allPage = Math.ceil(this.itemNum / 6);
        }
        var j = 0;
        var k = 0;
        var self = this;
        switch(self.state){
            //道具为6个一下
            case 0:
                for(let i = 0; i < self.itemNum ; i++){
                    var item = new createjs.Bitmap(game.assets.images["item_box_" + clickNum]);
                    item.regX = 42.5;
                    item.x = 512 / 2 + 115 * j - 115;
                    item.y = 250 + 170 * k;
                    item.name = k * 3 + j
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                    self.itemBox.addChild(item);
                }
            break;
            //道具数量为6个以上，第一页
            case 1:
                for(let i = 0; i < 6 ; i++){
                    var item = new createjs.Bitmap(game.assets.images["item_box_" + clickNum]);
                    item.regX = 42.5;
                    item.x = 512 / 2 + 115 * j - 115;
                    item.y = 250 + 170 * k;
                    item.name = k * 3 + j
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                    self.itemBox.addChild(item);
                }
                var buttonRight = new createjs.Bitmap(game.assets.images.shop_button_right_green);
                buttonRight.regX = 18;
                buttonRight.x = 512 / 2 + 115;
                buttonRight.y = 570;
                buttonRight.addEventListener("click",function(){
                    self.nowPage += 1;
                    self.addItem(clickNum);
                });
                var pageNum = new createjs.Text(self.nowPage + " / " + self.allPage ,"20px UDDigiKyokashoN","");
                pageNum.textAlign = "center";
                pageNum.x = 512 / 2;
                pageNum.y = 580;
                self.itemBox.addChild(pageNum,buttonRight);
            break;
            //道具数量为6个以上，中间页
            case 2:
                for(let i = self.nowPage * 6 ; i < self.nowPage * 6 + 6 ; i++){
                    var item = new createjs.Bitmap(game.assets.images["item_box_" + clickNum]);
                    item.regX = 42.5;
                    item.x = 512 / 2 + 115 * j - 115;
                    item.y = 250 + 170 * k;
                    item.name = (self.nowPage - 1) * 6 + k * 3 + j
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                    self.itemBox.addChild(item);
                }
                var buttonRight = new createjs.Bitmap(game.assets.images.shop_button_right_green);
                buttonRight.regX = 18;
                buttonRight.x = 512 / 2 + 115;
                buttonRight.y = 570;
                buttonRight.addEventListener("click",function(){
                    self.nowPage += 1;
                    self.addItem(clickNum);
                });
                var buttonLeft = new createjs.Bitmap(game.assets.images.shop_button_left_green);
                buttonLeft.regX = 18;
                buttonLeft.x = 512 / 2 - 115;
                buttonLeft.y = 570;
                buttonLeft.addEventListener("click",function(){
                    self.nowPage -= 1;
                    self.addItem(clickNum);
                });
                var pageNum = new createjs.Text(self.nowPage + " / " + self.allPage ,"20px UDDigiKyokashoN","");
                pageNum.textAlign = "center";
                pageNum.x = 512 / 2;
                pageNum.y = 580;
                self.itemBox.addChild(buttonRight , buttonLeft , pageNum);
            break;
            //道具数量为6个以上，最后页
            case 3:
                for(let i = (self.nowPage - 1) * 6 ; i < self.itemNum ; i++){
                    var item = new createjs.Bitmap(game.assets.images["item_box_" + clickNum]);
                    item.regX = 42.5;
                    item.x = 512 / 2 + 115 * j - 115;
                    item.y = 250 + 170 * k;
                    item.name = (self.nowPage - 1) * 6 + k * 3 + j;
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                    self.itemBox.addChild(item);
                }
                var buttonLeft = new createjs.Bitmap(game.assets.images.shop_button_left_green);
                buttonLeft.regX = 18;
                buttonLeft.x = 512 / 2 - 115;
                buttonLeft.y = 570;
                buttonLeft.addEventListener("click",function(){
                    self.nowPage -= 1;
                    self.addItem(clickNum);
                });
                var pageNum = new createjs.Text(self.nowPage + " / " + self.allPage ,"20px UDDigiKyokashoN","");
                pageNum.textAlign = "center";
                pageNum.x = 512 / 2;
                pageNum.y = 580;
                self.itemBox.addChild(buttonLeft , pageNum);
            break;
        }
    }

    Shop.prototype.close = function(){
        if(game.manager.managerNum == 5){
            game.stage.removeEvent(this.shopObj);
            game.manager.enter(1);
        }
    }
})()
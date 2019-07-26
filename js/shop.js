(function(){
    var Shop = window.Shop = function(){
        game.stage.removeChild(game.gameicon.iconObj);

        //打开关闭状态开关
        this.openState = false;
        this.closeState = false;

        //创建商店全体框架
        this.shopObj = new createjs.Container();
        this.shopObj.alpha = 0;
        this.shopObj.scale = 0.55;
        this.shopObj.regX = this.shopObj.x = game.canvas.width / 2;
        this.shopObj.regY = this.shopObj.y = game.canvas.height / 2;

        //创建黑色背景
        var blackBg = new createjs.Shape();
        blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        blackBg.alpha = 0.4;
        this.shopObj.addChild(blackBg);
        
        //创建商店内容框架
        this.shopBox = new createjs.Container();
        this.shopBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 512 , game.canvas.width / 512 , 0 , 0 , 0 , 256 , 337);
        this.shopObj.addChild(this.shopBox);

        //商店背景、文字、按钮、标签
        var self = this;
        this.addIcon("shopBg" , "shop_bg");
        this.addIcon("shopWord" , "shop_word" , 60 , 512 / 2 , 95 , false);
        this.addIcon("buttonClose" , "button_close" , 18 , 512 - 100 , 95 , true , function(){self.closeState = true});
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 512 / 2 - 120 , 150 , true , function(){self.changeBg(1);self.changePage(1)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 512 / 2 , 150 , true , function(){self.changeBg(2);;self.changePage(2)});
        this.addIcon("buttonExchange" , "shop_bg_button_3" , 60 , 512 / 2 + 120 , 150 , true , function(){self.changeBg(3);;self.changePage(3)});
        this.addIcon("itemBg" , "shop_bg_1" , 180 , 512 / 2 , 190 ,false);
        //插入道具框架
        this.itemBox = new createjs.Container();
        this.shopBox.addChild(this.itemBox);

        this.changePage(1);
    }
    //添加图标方法
    Shop.prototype.addIcon = function(iconName , imgURL , regX , x , y , isHave , callback){
        this[iconName] = new createjs.Bitmap(game.assets.images[imgURL]).set({regX:regX , x:x , y:y});
        if(isHave){
            this[iconName].addEventListener("click",function(){
                callback();
            });
        }
        this.shopBox.addChild(this[iconName]);
    }
    //点击标签后改变背景
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
    //翻页方法
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
                this.addChange();
            break;
        }
    }
    //添加道具栏方法
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
                    item.set({
                        regX : 42.5,
                        regY : 60,
                        x : 512 / 2 + 115 * j - 115,
                        y : 300 + 170 * k,
                        name : k * 3 + j
                    });
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addMoney(item.x , item.y , item.name);
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                }
            break;
            //道具数量为6个以上，第一页
            case 1:
                for(let i = 0; i < 6 ; i++){
                    var item = new createjs.Bitmap(game.assets.images["item_box_" + clickNum]);
                    item.set({
                        regX : 42.5,
                        regY : 60,
                        x : 512 / 2 + 115 * j - 115,
                        y : 300 + 170 * k,
                        name : k * 3 + j
                    });
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addMoney(item.x , item.y , item.name);
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                }
                if(clickNum == 1){
                    var buttonRight = new createjs.Bitmap(game.assets.images.shop_button_right_green);
                    buttonRight.regX = 18;
                    buttonRight.x = 512 / 2 + 115;
                    buttonRight.y = 570;
                    buttonRight.addEventListener("click",function(){
                        self.nowPage += 1;
                        self.addItem(clickNum);
                    });
                }else{
                    var buttonRight = new createjs.Bitmap(game.assets.images.shop_button_right_pink);
                    buttonRight.regX = 18;
                    buttonRight.x = 512 / 2 + 115;
                    buttonRight.y = 570;
                    buttonRight.addEventListener("click",function(){
                        self.nowPage += 1;
                        self.addItem(clickNum);
                    });
                }

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
                    item.set({
                        regX : 42.5,
                        regY : 60,
                        x : 512 / 2 + 115 * j - 115,
                        y : 300 + 170 * k,
                        name : (self.nowPage - 1) * 6 + k * 3 + j
                    });
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addMoney(item.x , item.y , item.name);
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                }
                if(clickNum == 1){
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
                }else{
                    var buttonRight = new createjs.Bitmap(game.assets.images.shop_button_right_pink);
                    buttonRight.regX = 18;
                    buttonRight.x = 512 / 2 + 115;
                    buttonRight.y = 570;
                    buttonRight.addEventListener("click",function(){
                        self.nowPage += 1;
                        self.addItem(clickNum);
                    });
                    var buttonLeft = new createjs.Bitmap(game.assets.images.shop_button_left_pink);
                    buttonLeft.regX = 18;
                    buttonLeft.x = 512 / 2 - 115;
                    buttonLeft.y = 570;
                    buttonLeft.addEventListener("click",function(){
                        self.nowPage -= 1;
                        self.addItem(clickNum);
                    });
                }

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
                    item.set({
                        regX : 42.5,
                        regY : 60,
                        x : 512 / 2 + 115 * j - 115,
                        y : 300 + 170 * k,
                        name : (self.nowPage - 1) * 6 + k * 3 + j
                    });
                    item.addEventListener("click",function(event){
                        console.log(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addMoney(item.x , item.y , item.name);
                    if(j < 2){
                        j++
                    }else{
                        j = 0;
                        k++
                    }
                }
                if(clickNum == 1){
                    var buttonLeft = new createjs.Bitmap(game.assets.images.shop_button_left_green);
                    buttonLeft.regX = 18;
                    buttonLeft.x = 512 / 2 - 115;
                    buttonLeft.y = 570;
                    buttonLeft.addEventListener("click",function(){
                        self.nowPage -= 1;
                        self.addItem(clickNum);
                    });
                }else{
                    var buttonLeft = new createjs.Bitmap(game.assets.images.shop_button_left_pink);
                    buttonLeft.regX = 18;
                    buttonLeft.x = 512 / 2 - 115;
                    buttonLeft.y = 570;
                    buttonLeft.addEventListener("click",function(){
                        self.nowPage -= 1;
                        self.addItem(clickNum);
                    });
                }

                var pageNum = new createjs.Text(self.nowPage + " / " + self.allPage ,"20px UDDigiKyokashoN","");
                pageNum.textAlign = "center";
                pageNum.x = 512 / 2;
                pageNum.y = 580;
                self.itemBox.addChild(buttonLeft , pageNum);
            break;
        }
    }

    //添加显示金钱
    Shop.prototype.addMoney = function(itemX , itemY , itemId){
        var money = new createjs.Text("5000" ,"18px UDDigiKyokashoN","");
        money.textAlign = "right";
        money.x = itemX + 30;
        money.y = itemY + 36;
        this.itemBox.addChild(money);
    }

    //兑换栏
    Shop.prototype.addChange = function(){
        this.itemBox.removeAllChildren();
        var item_chip_2 = new createjs.Bitmap(game.assets.images.item_chip_2);
        item_chip_2.set({
            regX : 20,
            regY : 20,
            x : 512 / 2 - 100,
            y : 350,
            scale : 1.5,
        });

        var item_crystal_2 = new createjs.Bitmap(game.assets.images.item_crystal_2);
        item_crystal_2.set({
            regX : 20,
            regY : 20,
            x : 512 / 2 + 100,
            y : 350,
            scale : 1.5,
        });

        var changeNum = new createjs.Text(" × 1000 = " ,"25px UDDigiKyokashoN","green");
        changeNum.textAlign = "center";
        changeNum.x = 512 / 2;
        changeNum.y = 340;
        this.itemBox.addChild(item_chip_2 , item_crystal_2 , changeNum);
    }

    Shop.prototype.open = function(){
        game.stage.addChild(this.shopObj);
        this.openState = true;
    }

    Shop.prototype.update = function(){
        if(this.openState){
            this.shopObj.alpha += 0.2;
            this.shopObj.scale = Number((this.shopObj.scale + 0.12).toFixed(2));
            if(this.shopObj.alpha >= 1){
                this.shopObj.scale = 1;
                this.openState = false;
            }
        }
        if(this.closeState){
            this.shopObj.alpha -= 0.2;
            this.shopObj.scale = Number((this.shopObj.scale - 0.1).toFixed(2));
            if(this.shopObj.alpha <= 0){
                this.shopObj.alpha = 0;
                this.shopObj.scale = 0.55;
                this.closeState = false;
                game.manager.enter(1);
            }
        }
    }
})()
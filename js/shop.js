(function(){
    var Shop = window.Shop = function(){
        var self = this;

        //打开关闭状态开关
        this.openState = false;
        this.closeState = false;

        this.buyState = true;
        
        //创建商店全体框架
        this.shopObj = new createjs.Container();
        this.shopObj.alpha = 0;
        this.shopObj.scale = 0.55;
        this.shopObj.regX = this.shopObj.x = game.canvas.width / 2;
        this.shopObj.regY = this.shopObj.y = game.canvas.height / 2;
        this.shopObj.visible = false;
        //创建黑色背景
        var blackBg = new createjs.Shape();
        blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        blackBg.alpha = 0.4;
        blackBg.addEventListener("click",function(){});
        this.shopObj.addChild(blackBg);
        
        //创建商店内容框架
        this.shopBox = new createjs.Container();
        this.shopBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 512 , game.canvas.width / 512 , 0 , 0 , 0 , 256 , 337);
        this.shopObj.addChild(this.shopBox);
        //商店背景、文字、按钮、标签
        this.addIcon("shopBg" , "shop_bg");
        this.addIcon("shopWord" , "shop_word" , 60 , 512 / 2 , 95 , false);
        this.addIcon("buttonClose" , "button_close" , 18 , 512 - 100 , 95 , true , function(){self.closeState = true});
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 512 / 2 - 120 , 150 , true , function(){self.changeBg(1);self.changePage(1)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 512 / 2 , 150 , true , function(){self.changeBg(2);self.changePage(2)});
        this.addIcon("buttonExchange" , "shop_bg_button_3" , 60 , 512 / 2 + 120 , 150 , true , function(){self.changeBg(3);self.changePage(3)});
        this.addIcon("itemBg" , "shop_bg_1" , 180 , 512 / 2 , 190 ,false);
        //插入道具框架
        this.itemBox = new createjs.Container();
        this.shopBox.addChild(this.itemBox);

        this.buyBox = new createjs.Container();
        this.buyBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 450 , game.canvas.width / 450 , 0 , 0 , 0 , 180 , 180);
        
        this.shopObj.addChild(this.buyBox);

        self.changePage(1);
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
        if(clickNum == 1){
            this.itemNum = game.gameObj.plantData.length;
        }else if(clickNum == 2){
            this.itemNum = game.gameObj.ornamentData.length;
        }
        
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
            //道具为6个以下
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
                        self.buyItem(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addItemIcon(item.x , item.y , clickNum , item.name);
                    this.addItemName(item.x , item.y , clickNum , item.name);
                    this.addMoney(item.x , item.y , clickNum , item.name);
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
                        self.buyItem(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addItemIcon(item.x , item.y , clickNum , item.name);
                    this.addItemName(item.x , item.y , clickNum , item.name);
                    this.addMoney(item.x , item.y , clickNum , item.name);
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
                        self.buyItem(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addItemIcon(item.x , item.y , clickNum , item.name);
                    this.addItemName(item.x , item.y , clickNum , item.name);
                    this.addMoney(item.x , item.y , clickNum , item.name);
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
                        self.buyItem(event.target.name);
                    });
                    this.itemBox.addChild(item);
                    this.addItemIcon(item.x , item.y , clickNum , item.name);
                    this.addItemName(item.x , item.y , clickNum , item.name);
                    this.addMoney(item.x , item.y , clickNum , item.name);
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

    Shop.prototype.addItemIcon = function(itemX , itemY , clickNum , itemName){
        let clickName;
        if(clickNum == 1){
            clickName = "plantData";
        }else if(clickNum == 2){
            clickName = "ornamentData";
        }
        var flowerIcon = new createjs.Bitmap(game.assets.images["flower_" + game.gameObj[clickName][itemName].name + "_bag"]);
        flowerIcon.set({
            regX : 42.5,
            regY : 60,
            x : itemX,
            y : itemY,
        });
        this.itemBox.addChild(flowerIcon);
    }

    Shop.prototype.addItemName = function(itemX , itemY , clickNum , itemName){
        let clickName;
        if(clickNum == 1){
            clickName = "plantData";
        }else if(clickNum == 2){
            clickName = "ornamentData";
        }
        var flowerName = new createjs.Text("" ,"15px UDDigiKyokashoN","");
        flowerName.textAlign = "center";
        flowerName.x = itemX;
        flowerName.y = itemY - 85;
        flowerName.text = game.gameObj[clickName][itemName].jpname
        this.itemBox.addChild(flowerName);
    }
    //添加显示金钱
    Shop.prototype.addMoney = function(itemX , itemY , clickNum , itemName){
        let clickName;
        if(clickNum == 1){
            clickName = "plantData";
        }else if(clickNum == 2){
            clickName = "ornamentData";
        }
        var money = new createjs.Text("" ,"18px UDDigiKyokashoN","");
        money.textAlign = "right";
        money.x = itemX + 30;
        money.y = itemY + 36;
        money.text = game.gameObj[clickName][itemName].buy
        this.itemBox.addChild(money);
    }

    //兑换栏
    Shop.prototype.addChange = function(){
        var self = this;
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

        var changeButton = new createjs.Bitmap(game.assets.images.button_change).set({
            regX : 85,
            x : 512 / 2,
            y : 450
        });
        changeButton.addEventListener("click" , function(){
            self.changeMoney();
        });
        this.itemBox.addChild(item_chip_2 , item_crystal_2 , changeNum , changeButton);
    }

    Shop.prototype.buyItem = function(itemId){
        this.buyBox.visible = true;
        this.shopBox.visible = false;
        var self = this;
        this.itemURL = "flower_" + game.gameObj.plantData[itemId].name + "_bag";
        this.needMoney = game.gameObj.plantData[itemId].buy;
        this.buyBox.removeAllChildren();
            
        this.buyBg = new createjs.Bitmap(game.assets.images.shop_buy_bg);
        this.title = new createjs.Text("購入" ,"25px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 30
        });
        this.buyItemIcon = new createjs.Bitmap(game.assets.images[this.itemURL]).set({
            regX : 42.5,
            regY : 60,
            x : 360 / 2,
            y : 120
        });

        this.plusButton = new createjs.Bitmap(game.assets.images.shop_button_right_green).set({
            regX : 18,
            regY : 20,
            x : 360 / 2 + 80,
            y : 180,
        });
        this.minusButton = new createjs.Bitmap(game.assets.images.shop_button_left_green).set({
            regX : 18,
            regY : 20,
            x : 360 / 2 - 80,
            y : 180,
        });
        this.buyNumText = new createjs.Text("1" ,"24px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 170
        });

        this.moneyIcon = new createjs.Bitmap(game.assets.images.item_chip_2).set({
            regX : 20,
            regY : 20,
            x : 360 / 2 - 70,
            y : 245,
        });
        this.money = new createjs.Text(this.needMoney ,"30px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 230
        });

        this.cancelButton = new createjs.Bitmap(game.assets.images.button_brown).set({
            regX : 53,
            regY : 18,
            x : 360 / 2 - 80,
            y : 310,
        });
        this.cancelText = new createjs.Text("キャンセル" ,"16px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : this.cancelButton.x,
            y : this.cancelButton.y - 8
        });
        this.buyButton = new createjs.Bitmap().set({
            regX : 53,
            regY : 18,
            x : 360 / 2 + 80,
            y : 310,
        });
        this.buyText = new createjs.Text("購入する" ,"16px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : this.buyButton.x,
            y : this.buyButton.y - 8
        });
        this.buyBox.addChild(this.buyBg , this.title , this.buyItemIcon , this.plusButton , this.minusButton , this.buyNumText , this.moneyIcon , this.money , this.cancelButton , this.cancelText , this.buyButton , this.buyText);
        
        if(this.money.text <= game.playerObj.money){
            this.buyButton.image = game.assets.images.button_green;
        }else{
            this.buyButton.image = game.assets.images.button_gray;
        }

        this.plusButton.addEventListener("click",function(){
            self.buyNumText.text = Number(self.buyNumText.text) + 1;
            self.money.text = Number(self.buyNumText.text) * Number(game.gameObj.plantData[itemId].buy);
            if(self.money.text <= game.playerObj.money){
                self.buyButton.image = game.assets.images.button_green;
            }else{
                self.buyButton.image = game.assets.images.button_gray;
            }
        });
        this.minusButton.addEventListener("click",function(){
            if(Number(self.buyNumText.text) > 1){
                self.buyNumText.text = Number(self.buyNumText.text) - 1;
                self.money.text = Number(self.buyNumText.text) * Number(game.gameObj.plantData[itemId].buy);
                if(self.money.text <= game.playerObj.money){
                    self.buyButton.image = game.assets.images.button_green;
                }else{
                    self.buyButton.image = game.assets.images.button_gray;
                }
            }
        });
        this.cancelButton.addEventListener("click",function(){
            self.buyBox.visible = false;
            self.shopBox.visible = true;
        });
        this.buyButton.addEventListener("click",function(){
            if(self.money.text <= game.playerObj.money){
                self.doBuyItem(itemId , self.buyNumText.text , self.money.text)
            }else{
                return;
            }
        })
    }

    Shop.prototype.doBuyItem = function(itemId , buyNum , moneyNum){
        var self = this;
        if(this.buyState == true){
            this.buyState = false;
            if(game.playerObj.depository == undefined){
                game.playerObj.depository = {
                    seed : [{
                        id : itemId,
                        num : buyNum
                    }]
                }
                game.playerObj.money -= Number(moneyNum);
                game.playerData.set(game.playerObj , function(){
                    self.buySuccess();
                });
            }else if(game.playerObj.depository.seed == undefined){
                game.playerObj.depository.seed = [{
                    id : itemId,
                    num : buyNum
                }];
                game.playerObj.money -= Number(moneyNum);
                game.playerData.set(game.playerObj , function(){
                    self.buySuccess();
                });
            }else{
                for(let n = 0 ; n < game.playerObj.depository.seed.length ; n++){
                    if(game.playerObj.depository.seed[n].id == itemId){
                        game.playerObj.depository.seed[n].num = Number(game.playerObj.depository.seed[n].num) + Number(buyNum);
                        game.playerObj.money -= Number(moneyNum);
                        game.playerData.set(game.playerObj , function(){
                            self.buySuccess();
                        });
                        return;
                    }
                }
                game.playerObj.depository.seed.push({
                    id : itemId,
                    num : buyNum
                });
                game.playerObj.money -= Number(moneyNum);
                game.playerData.set(game.playerObj , function(){
                    self.buySuccess();
                });
            }
        }
    }

    Shop.prototype.buySuccess = function(){
        var self = this;
        this.buyBox.removeAllChildren();
        var buyBg = new createjs.Bitmap(game.assets.images.shop_buy_bg);
        var successText = new createjs.Text("購入成功しました!" ,"35px UDDigiKyokashoN","#16982b").set({
            textAlign : "center",
            x : 360 / 2,
            y : 140
        });
        var successButton = new createjs.Bitmap(game.assets.images.button_green).set({
            regX : 53,
            regY : 18,
            x : 360 / 2,
            y : 250,
        });
        successButton.addEventListener("click",function(){
            self.buyState = true;
            self.buyBox.visible = false;
            self.shopBox.visible = true;
        })
        var successButtonText = new createjs.Text("OK" ,"22px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : successButton.x,
            y : successButton.y - 10
        });
        this.buyBox.addChild(buyBg , successText , successButton , successButtonText);
    }

    Shop.prototype.changeMoney = function(){
        var self = this;
        this.shopBox.visible = false;
        this.buyBox.visible = true;
        this.buyBox.removeAllChildren();
        var changeBg = new createjs.Bitmap(game.assets.images.shop_buy_bg);
        var title = new createjs.Text("結晶を交換する" ,"25px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 30
        });
        var changeItemIcon = new createjs.Bitmap(game.assets.images.item_crystal_2).set({
            regX : 20,
            x : 360 / 2,
            y : 120
        });

        var plusButton = new createjs.Bitmap(game.assets.images.shop_button_right_green).set({
            regX : 18,
            regY : 20,
            x : 360 / 2 + 80,
            y : 180,
        });
        var minusButton = new createjs.Bitmap(game.assets.images.shop_button_left_green).set({
            regX : 18,
            regY : 20,
            x : 360 / 2 - 80,
            y : 180,
        });
        var changeNumText = new createjs.Text("1" ,"24px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 170
        });

        var moneyIcon = new createjs.Bitmap(game.assets.images.item_chip_2).set({
            regX : 20,
            regY : 20,
            x : 360 / 2 - 70,
            y : 245,
        });
        var money = new createjs.Text("1000" ,"30px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 230
        });

        var cancelButton = new createjs.Bitmap(game.assets.images.button_brown).set({
            regX : 53,
            regY : 18,
            x : 360 / 2 - 80,
            y : 310,
        });
        var cancelText = new createjs.Text("キャンセル" ,"16px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : cancelButton.x,
            y : cancelButton.y - 8
        });
        var changeButton = new createjs.Bitmap().set({
            regX : 53,
            regY : 18,
            x : 360 / 2 + 80,
            y : 310,
        });
        var changeText = new createjs.Text("交換する" ,"16px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : changeButton.x,
            y : changeButton.y - 8
        });

        if(Number(money.text) + 30 < game.playerObj.money){
            changeButton.image = game.assets.images.button_green;
        }else{
            changeButton.image = game.assets.images.button_gray;
        }

        plusButton.addEventListener("click",function(){
            changeNumText.text = Number(changeNumText.text) + 1;
            money.text = Number(changeNumText.text) * 1000;
            if(Number(money.text) + 30 < game.playerObj.money){
                changeButton.image = game.assets.images.button_green;
            }else{
                changeButton.image = game.assets.images.button_gray;
            }
        });
        minusButton.addEventListener("click",function(){
            if(Number(changeNumText.text) > 1){
                changeNumText.text = Number(changeNumText.text) - 1;
                money.text = Number(changeNumText.text) * 1000;
                if(Number(money.text) + 30 < game.playerObj.money){
                    changeButton.image = game.assets.images.button_green;
                }else{
                    changeButton.image = game.assets.images.button_gray;
                }
            }
        });
        cancelButton.addEventListener("click",function(){
            self.buyBox.visible = false;
            self.shopBox.visible = true;
        });
        changeButton.addEventListener("click",function(){
            if(Number(money.text) + 30 <= game.playerObj.money){
                self.doChangeMoney(money.text , changeNumText.text);
            }else{
                return;
            }
        });
        this.buyBox.addChild(changeBg , title , changeItemIcon , plusButton , minusButton , changeNumText , moneyIcon , money , cancelButton , cancelText , changeButton , changeText)
    }

    Shop.prototype.doChangeMoney = function(changeNum , addNum){
        var self = this;
        if(this.buyState = true){
            this.buyState = false;
            game.playerObj.money = Number(game.playerObj.money) - Number(changeNum);
            game.playerObj.crystal = Number(game.playerObj.crystal) + Number(addNum);
            game.playerData.set(game.playerObj , function(){
                self.ChangeMoneySuccess(addNum);
            });
        }
    }

    Shop.prototype.ChangeMoneySuccess = function(addNum){
        var self = this;
        this.buyBox.removeAllChildren();
        var buyBg = new createjs.Bitmap(game.assets.images.shop_buy_bg);
        var successText = new createjs.Text("結晶を" + addNum + "個交換しました!" ,"25px UDDigiKyokashoN","#16982b").set({
            textAlign : "center",
            x : 360 / 2,
            y : 140
        });
        var successButton = new createjs.Bitmap(game.assets.images.button_green).set({
            regX : 53,
            regY : 18,
            x : 360 / 2,
            y : 250,
        });
        successButton.addEventListener("click",function(){
            self.buyState = true;
            self.buyBox.visible = false;
            self.shopBox.visible = true;
        })
        var successButtonText = new createjs.Text("OK" ,"22px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : successButton.x,
            y : successButton.y - 10
        });
        this.buyBox.addChild(buyBg , successText , successButton , successButtonText);
    }

    Shop.prototype.open = function(){
        this.shopObj.visible = true;
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
                this.shopObj.visible = false;
                this.closeState = false;
                game.manager.enter(1);
            }
        }
    }
})()
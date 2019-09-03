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
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 512 / 2 - 120 , 150 , true , function(){self.changePage(0)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 512 / 2 , 150 , true , function(){self.changePage(1)});
        this.addIcon("buttonExchange" , "shop_bg_button_3" , 60 , 512 / 2 + 120 , 150 , true , function(){self.changePage(2)});
        this.addIcon("itemBg" , "shop_bg_1" , 180 , 512 / 2 , 190 ,false);
        //插入道具框架
        this.itemBox = new createjs.Container();
        this.shopBox.addChild(this.itemBox);

        this.buyBox = new createjs.Container();
        this.buyBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 450 , game.canvas.width / 450 , 0 , 0 , 0 , 180 , 180);
        
        this.shopObj.addChild(this.buyBox);

        self.changePage(0);
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
    //点击标签后的方法
    Shop.prototype.changePage = function(clickNum){
        this.itemNum = 0;
        this.nowPage = 0;
        switch(clickNum){
            case 0:
                this.itemBg.image = game.assets.images.shop_bg_1;
                this.itemNum = game.gameObj.plantData.length;
                this.updatePageContent(clickNum);
            break;
            case 1:
                this.itemBg.image = game.assets.images.shop_bg_2;
                this.itemNum = Object.keys(game.gameObj.decorationData).length;
                this.updatePageContent(clickNum);
            break;
            case 2:
                this.itemBg.image = game.assets.images.shop_bg_3;
                this.addChange();
            break;
        }
    }

    Shop.prototype.updatePageContent = function(clickNum){
        if(this.itemNum % 6 == 0){
            this.allPage = Math.floor(this.itemNum / 6) - 1;
        }else{
            this.allPage = Math.floor(this.itemNum / 6);
        }
        
        let j = 0;
        let k = 0;
        let nowPageItemNum;

        this.itemBox.removeAllChildren();
        
        if(this.itemNum - this.nowPage * 6 >= 6){
            nowPageItemNum = 6;
        }else{
            if(this.nowPage * 6 == 0){
                nowPageItemNum = this.itemNum;
            }else{
                nowPageItemNum = this.itemNum % (this.nowPage * 6);
            }
            
        }

        if(this.nowPage == 0 && this.allPage > 0){
            this.addButton(clickNum , 0);
        }else if(this.nowPage != 0 && this.allPage != 0 && this.nowPage != this.allPage){
            this.addButton(clickNum , 1);
        }else if(this.nowPage == this.allPage && this.allPage != 0){
            this.addButton(clickNum , 2);
        }


        for(let i = this.nowPage * 6 ; i < this.nowPage * 6 + nowPageItemNum ; i++){
            this.addItemBox(clickNum , j , k , i);
            if(j < 2){
                j++
            }else{
                j = 0;
                k++
            }
        }
        let pageNum = new createjs.Text((this.nowPage + 1) + " / " + (this.allPage + 1) ,"20px UDDigiKyokashoN","");
        pageNum.textAlign = "center";
        pageNum.x = 512 / 2;
        pageNum.y = 600;
        this.itemBox.addChild(pageNum);
    }

    Shop.prototype.addItemBox = function(clickNum , j , k , i){
        let self = this;
        let item = new createjs.Bitmap();
        switch(clickNum){
            case 0:
                item.set({
                    image : game.assets.images.item_box_1,
                    regX : 42.5,
                    regY : 60,
                    x : 512 / 2 + 115 * j - 115,
                    y : 320 + 170 * k,
                    itemid : i
                });
                item.addEventListener("click",function(event){
                    self.buyItem(event.target.itemid);
                });
            break;
            case 1:
                item.set({
                    image : game.assets.images.item_box_2,
                    regX : 42.5,
                    regY : 60,
                    x : 512 / 2 + 115 * j - 115,
                    y : 320 + 170 * k,
                    itemid : i
                });
                item.addEventListener("click",function(event){
                    console.log("装饰品");
                });
            break;
        }
        this.itemBox.addChild(item);
        this.addItemIcon(clickNum , item.x , item.y , i);
        this.addMoney(clickNum , item.x , item.y , i);
        this.addItemName(clickNum , item.x , item.y , i)
    }

    Shop.prototype.addItemIcon = function(clickNum , ItemBoxX , ItemBoxY , i){
        var imageName;
        let self = this;
        switch(clickNum){
            //添加种子图标
            case 0:
                imageName = "flower_" + game.gameObj.plantData[i].name + "_bag";
            break;
            //添加装饰图标
            case 1:
                imageName = game.gameObj.decorationData[Object.keys(game.gameObj.decorationData)[i]].name;
            break;
        }
        let itemIcon = new createjs.Bitmap(game.assets.images[imageName]);
        itemIcon.set({
            regX : 42.5,
            regY : 60,
            x : ItemBoxX,
            y : ItemBoxY,
        });
        this.itemBox.addChild(itemIcon);
    }

    Shop.prototype.addMoney = function(clickNum , ItemBoxX , ItemBoxY , i){
        var itemMoney;
        switch(clickNum){
            //添加种子价格
            case 0:
                itemMoney = game.gameObj.plantData[i].buy;
            break;
            //添加装饰价格
            case 1:
                itemMoney = game.gameObj.decorationData[Object.keys(game.gameObj.decorationData)[i]].buy;
            break;
        }
        
        var numberText = new createjs.Text(itemMoney ,"18px UDDigiKyokashoN","#000000");
        numberText.textAlign = "right";
        numberText.x = ItemBoxX + 32;
        numberText.y = ItemBoxY + 36;
        this.itemBox.addChild(numberText);
    }

    Shop.prototype.addItemName = function(clickNum , ItemBoxX , ItemBoxY , i){
        var itemName;
        switch(clickNum){
            //添加种子图标
            case 0:
                itemName = game.gameObj.plantData[i].jpname;
            break;
            //添加装饰图标
            case 1:
                itemName = game.gameObj.decorationData[Object.keys(game.gameObj.decorationData)[i]].jpname
            break;
        }
        var itemNameText = new createjs.Text(itemName ,"15px UDDigiKyokashoN","#000000");
        itemNameText.textAlign = "center";
        itemNameText.x = ItemBoxX;
        itemNameText.y = ItemBoxY - 85;
        this.itemBox.addChild(itemNameText);
    }

    Shop.prototype.addButton = function(clickNum , state){
        let self = this;
        let buttonColor = ["green" , "pink"];
        switch(state){
            case 0:
                var buttonRight = new createjs.Bitmap(game.assets.images["shop_button_right_" + buttonColor[clickNum]]);
                buttonRight.regX = 18;
                buttonRight.x = 512 / 2 + 115;
                buttonRight.y = 590;
                buttonRight.addEventListener("click",function(){
                    self.nowPage += 1;
                    self.updatePageContent(clickNum);
                });
                this.itemBox.addChild(buttonRight);
            break;
            case 1:
                var buttonLeft = new createjs.Bitmap(game.assets.images["shop_button_left_" + buttonColor[clickNum]]);
                buttonLeft.regX = 18;
                buttonLeft.x = 512 / 2 - 115;
                buttonLeft.y = 590;
                buttonLeft.addEventListener("click",function(){
                    self.nowPage -= 1;
                    self.updatePageContent(clickNum);
                });
                
                var buttonRight = new createjs.Bitmap(game.assets.images["shop_button_right_" + buttonColor[clickNum]]);
                buttonRight.regX = 18;
                buttonRight.x = 512 / 2 + 115;
                buttonRight.y = 590;
                buttonRight.addEventListener("click",function(){
                    self.nowPage += 1;
                    self.updatePageContent(clickNum);
                });
                this.itemBox.addChild(buttonLeft , buttonRight);
            break;
            case 2:
                var buttonLeft = new createjs.Bitmap(game.assets.images["shop_button_left_" + buttonColor[clickNum]]);
                buttonLeft.regX = 18;
                buttonLeft.x = 512 / 2 - 115;
                buttonLeft.y = 590;
                buttonLeft.addEventListener("click",function(){
                    self.nowPage -= 1;
                    self.updatePageContent(clickNum);
                });
                this.itemBox.addChild(buttonLeft);
            break;
        }
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
            
        var buyBg = new createjs.Bitmap(game.assets.images.shop_buy_bg);
        var title = new createjs.Text("購入" ,"25px UDDigiKyokashoN","#000000").set({
            textAlign : "center",
            x : 360 / 2,
            y : 30
        });
        var buyItemIcon = new createjs.Bitmap(game.assets.images[this.itemURL]).set({
            regX : 42.5,
            regY : 60,
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
        var buyNumText = new createjs.Text("1" ,"24px UDDigiKyokashoN","#000000").set({
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
        var money = new createjs.Text(this.needMoney ,"30px UDDigiKyokashoN","#000000").set({
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
        var buyButton = new createjs.Bitmap().set({
            regX : 53,
            regY : 18,
            x : 360 / 2 + 80,
            y : 310,
        });
        var buyText = new createjs.Text("購入する" ,"16px UDDigiKyokashoN","#FFFFFF").set({
            textAlign : "center",
            x : buyButton.x,
            y : buyButton.y - 8
        });
        this.buyBox.addChild(buyBg , title , buyItemIcon , plusButton , minusButton , buyNumText , moneyIcon , money , cancelButton , cancelText , buyButton , buyText);
        
        minusButton.visible = false;
        if(money.text <= game.playerObj.money){
            buyButton.image = game.assets.images.button_green;
        }else{
            buyButton.image = game.assets.images.button_gray;
        }

        plusButton.addEventListener("click",function(){
            buyNumText.text = Number(buyNumText.text) + 1;
            minusButton.visible = true;
            money.text = Number(buyNumText.text) * Number(game.gameObj.plantData[itemId].buy);
            if(money.text <= game.playerObj.money){
                buyButton.image = game.assets.images.button_green;
            }else{
                buyButton.image = game.assets.images.button_gray;
            }
        });
        minusButton.addEventListener("click",function(){
            buyNumText.text = Number(buyNumText.text) - 1;
            if(Number(buyNumText.text) <= 1){
                minusButton.visible = false;
                money.text = Number(buyNumText.text) * Number(game.gameObj.plantData[itemId].buy);
                if(money.text <= game.playerObj.money){
                    buyButton.image = game.assets.images.button_green;
                }else{
                    buyButton.image = game.assets.images.button_gray;
                }
            }else{
                minusButton.visible = true;
                money.text = Number(buyNumText.text) * Number(game.gameObj.plantData[itemId].buy);
                if(money.text <= game.playerObj.money){
                    buyButton.image = game.assets.images.button_green;
                }else{
                    buyButton.image = game.assets.images.button_gray;
                }
            }
        });
        cancelButton.addEventListener("click",function(){
            self.buyBox.visible = false;
            self.shopBox.visible = true;
        });
        buyButton.addEventListener("click",function(){
            if(money.text <= game.playerObj.money){
                self.doBuyItem(itemId , buyNumText.text , money.text)
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
            y : 100
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
        minusButton.visible = false;
        if(Number(money.text) + 30 < game.playerObj.money){
            changeButton.image = game.assets.images.button_green;
        }else{
            changeButton.image = game.assets.images.button_gray;
        }

        plusButton.addEventListener("click",function(){
            minusButton.visible = true;
            changeNumText.text = Number(changeNumText.text) + 1;
            money.text = Number(changeNumText.text) * 1000;
            if(Number(money.text) + 30 < game.playerObj.money){
                changeButton.image = game.assets.images.button_green;
            }else{
                changeButton.image = game.assets.images.button_gray;
            }
        });
        minusButton.addEventListener("click",function(){
            changeNumText.text = Number(changeNumText.text) - 1;
            if(Number(changeNumText.text) <= 1){
                minusButton.visible = false;
                money.text = Number(changeNumText.text) * 1000;
                if(Number(money.text) + 30 < game.playerObj.money){
                    changeButton.image = game.assets.images.button_green;
                }else{
                    changeButton.image = game.assets.images.button_gray;
                }
            }else{
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
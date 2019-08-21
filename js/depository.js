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
        this.blackBg = new createjs.Shape();
        this.blackBg.graphics.beginFill("black").drawRect(0,0,game.canvas.width, game.canvas.height);
        this.blackBg.alpha = 0.4;
        this.depositoryObj.addChild(this.blackBg);
        
        //创建商店内容框架
        this.depositoryBox = new createjs.Container();
        this.depositoryBox.setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 500 , game.canvas.width / 500 , 0 , 0 , 0 , 212.5 , 350);
        this.depositoryObj.addChild(this.depositoryBox);
        //商店背景、文字、按钮、标签
        this.addIcon("shopBg" , "depository_bg");
        this.addIcon("shopWord" , "depository_word" , 60 , 425 / 2 , 115);
        this.addIcon("buttonClose" , "button_close" , 18 , 425 - 60 , 115 , true , function(){self.closeState = true});
        this.addIcon("buttonSeed" , "shop_bg_button_1" , 60 , 425 / 2 - 120 , 170 , true , function(){self.changePage(0)});
        this.addIcon("buttonDecorate" , "shop_bg_button_2" , 60 , 425 / 2 , 170 , true , function(){self.changePage(1)});
        this.addIcon("buttonExchange" , "depository_bg_button_3" , 60 , 425 / 2 + 120 , 170 , true , function(){self.changePage(2)});
        this.addIcon("itemBg" , "shop_bg_1" , 180 , 425 / 2 , 210 ,false);
        //插入道具框架
        this.itemBox = new createjs.Container();
        this.depositoryBox.addChild(this.itemBox);
        self.changePage(0);
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

    //点击标签后的方法
    Depository.prototype.changePage = function(clickNum){
        this.itemNum = 0;
        this.nowPage = 0;
        switch(clickNum){
            case 0:
                this.itemBg.image = game.assets.images.shop_bg_1;
                if(game.playerObj.depository.seed != undefined){
                    this.itemNum = game.playerObj.depository.seed.length;
                }
                this.updatePageContent(clickNum);
            break;
            case 1:
                this.itemBg.image = game.assets.images.shop_bg_2;
                if(game.playerObj.depository.ornament != undefined){
                    this.itemNum = game.playerObj.depository.ornament.length;
                }
                this.updatePageContent(clickNum);
            break;
            case 2:
                this.itemBg.image = game.assets.images.shop_bg_3;
                if(game.playerObj.depository.exchange != undefined){
                    this.itemNum = game.playerObj.depository.exchange.length;
                }
                this.updatePageContent(clickNum);
            break;
        }
    }

    Depository.prototype.updatePageContent = function(clickNum){
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
        pageNum.x = 425 / 2;
        pageNum.y = 600;
        this.itemBox.addChild(pageNum);
    }

    Depository.prototype.addItemBox = function(clickNum , j , k , i){
        let self = this;
        let className = ["seed" , "ornament" , "exchange"];
        let itemBoxName = ["depository_box_brown" , "depository_box_red" , "depository_box_blue"];
        let item = new createjs.Bitmap(game.assets.images[itemBoxName[clickNum]]);
        item.set({
            regX : 42.5,
            regY : 60,
            x : 425 / 2 + 115 * j - 115,
            y : 320 + 170 * k,
            class : className[clickNum],
            name : i,
            itemid : game.playerObj.depository[className[clickNum]][i].id
        });
        switch(clickNum){
            case 0:
                item.addEventListener("click",function(event){
                    self.addFlower(event.target.itemid , event.target.name);
                });
            break;
            case 1:

            break;
            case 2:
                item.addEventListener("click",function(){
                    
                });
            break;
        }
        this.itemBox.addChild(item);
        this.addItemIcon(clickNum , className[clickNum] , item.x , item.y , i);
        this.addNumber(className[clickNum] , item.x , item.y , i);
    }

    Depository.prototype.addItemIcon = function(clickNum , class_Name , ItemBoxX , ItemBoxY , i){
        var imageName;
        let self = this;
        switch(clickNum){
            //添加种子图标
            case 0:
                imageName = "flower_" + game.gameObj.plantData[game.playerObj.depository[class_Name][i].id].name + "_bag";
            break;
            //添加装饰图标
            case 1:

            break;
            //添加果实图标
            case 2:
                imageName = "flower_" + game.gameObj.plantData[game.playerObj.depository[class_Name][i].id].name + "_ball";
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

    Depository.prototype.addNumber = function(class_Name , ItemBoxX , ItemBoxY , i){
        let itemNumber = game.playerObj.depository[class_Name][i].num;
        var numberText = new createjs.Text(itemNumber ,"18px UDDigiKyokashoN","#ffffff");
        numberText.textAlign = "right";
        numberText.x = ItemBoxX + 32;
        numberText.y = ItemBoxY + 36;
        this.itemBox.addChild(numberText);
    }

    Depository.prototype.addButton = function(clickNum , state){
        let self = this;
        let buttonColor = ["green" , "pink" , "blue"];
        switch(state){
            case 0:
                var buttonRight = new createjs.Bitmap(game.assets.images["shop_button_right_" + buttonColor[clickNum]]);
                buttonRight.regX = 18;
                buttonRight.x = 425 / 2 + 115;
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
                buttonLeft.x = 425 / 2 - 115;
                buttonLeft.y = 590;
                buttonLeft.addEventListener("click",function(){
                    self.nowPage -= 1;
                    self.updatePageContent(clickNum);
                });
                
                var buttonRight = new createjs.Bitmap(game.assets.images["shop_button_right_" + buttonColor[clickNum]]);
                buttonRight.regX = 18;
                buttonRight.x = 425 / 2 + 115;
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
                buttonLeft.x = 425 / 2 - 115;
                buttonLeft.y = 590;
                buttonLeft.addEventListener("click",function(){
                    self.nowPage -= 1;
                    self.updatePageContent(clickNum);
                });
                this.itemBox.addChild(buttonLeft);
            break;
        }
    }

    Depository.prototype.addFlower = function(flowerId , i){
        let self = this;
        this.blackBg.visible = false;
        this.depositoryBox.visible = false;
        this.closeButton = new createjs.Bitmap(game.assets.images.button_back).set({
            regX : 32,
            regY : 32,
            scale : 0.8,
            x : game.canvas.width - 40,
            y : game.canvas.height - 35,
        });
        this.closeButton.addEventListener("click",function(){
            game.flowerpot.removeArrow();
            self.depositoryObj.removeChild(self.closeButton);
            game.manager.enter(1);
        });
        this.depositoryObj.addChild(this.closeButton);
        game.manager.enter(2.5);
                            
        game.flowerpot.bindEvent("flower" , flowerId , i);
    }

    Depository.prototype.sell = function(itemId){

    }

    Depository.prototype.open = function(){
        game.stage.removeChild(game.gameicon.iconObj);
        game.stage.addChild(this.depositoryObj);
        this.blackBg.visible = true;
        this.depositoryBox.visible = true;
        this.depositoryObj.alpha = 0;
        this.depositoryObj.scale = 0.55;
        this.changePage(0);
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
(function(){
    var Alarm = window.Alarm = function(){

        this.openState = false;
        this.closeState = false;

        this.alarmState = false;
        this.windowState = false;
        this.netState = true;

        this.alarmObj = new createjs.Container().set({
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
        this.alarmObj.addChild(blackBg);

        this.alarmSetObj = new createjs.Container().setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 380 , game.canvas.width / 380 , 0 , 0 , 0 , 180 , 180);
        this.alarmSetObj.visible = false;
        this.alarmOnObj = new createjs.Container().setTransform(game.canvas.width / 2 , game.canvas.height / 2 , game.canvas.width / 380 , game.canvas.width / 380 , 0 , 0 , 0 , 180 , 180);
        this.alarmOnObj.visible = false;

        this.alarmObj.addChild(blackBg , this.alarmSetObj , this.alarmOnObj);

        this.alarmSetAddChild();
        this.alarmOnAddChild();

        if(game.time.getDate() != game.playerObj.alarm.date){
            game.playerData.child("alarm").update({
                date : game.time.getDate(),
                getup : false
            });
        }
    }

    Alarm.prototype.alarmSetAddChild = function(){
        var self = this;
        this.alarmSetObj.removeAllChildren();
        
        var alarmBg = new createjs.Bitmap(game.assets.images.alarm_bg_1);
        this.point = new createjs.Text(":" ,"70px UDDigiKyokashoN","#000000").set({
            x : 180,
            y : 140,
            textAlign : "center",
        });
        this.hour = new createjs.Text("" ,"70px UDDigiKyokashoN","#000000").set({
            x : self.point.x - 70,
            y : 140,
            textAlign : "center",
        });

        this.minute = new createjs.Text("" ,"70px UDDigiKyokashoN","#000000").set({
            x : self.point.x + 70,
            y : 140,
            textAlign : "center",
        });
        game.playerObj.alarm.hour < 10 ? this.hour.text = "0" + game.playerObj.alarm.hour : this.hour.text = game.playerObj.alarm.hour;
        game.playerObj.alarm.minute < 10 ? this.minute.text = "0" + game.playerObj.alarm.minute : this.minute.text = game.playerObj.alarm.minute;
        
        var hourPlus = new createjs.Bitmap(game.assets.images.shop_button_right_blue).set({
            regX : 18,
            regY : 20,
            x : 110,
            y : 120,
            rotation : -90,
            scale : 0.8
        });
        var hourMinus = new createjs.Bitmap(game.assets.images.shop_button_right_blue).set({
            regX : 18,
            regY : 20,
            x : 110,
            y : 230,
            rotation : 90,
            scale : 0.8
        });
        var minutePlus = new createjs.Bitmap(game.assets.images.shop_button_right_blue).set({
            regX : 18,
            regY : 20,
            x : 250,
            y : 120,
            rotation : -90,
            scale : 0.8
        });
        var minuteMinus = new createjs.Bitmap(game.assets.images.shop_button_right_blue).set({
            regX : 18,
            regY : 20,
            x : 250,
            y : 230,
            rotation : 90,
            scale : 0.8
        });

        var buttonCancel = new createjs.Bitmap(game.assets.images.alarm_cancel).set({
            regX : 88,
            regY : 30,
            x : 110,
            y : 290,
            scale : 0.7
        });
        var buttonCancelText = new createjs.Text("キャンセル" ,"18px UDDigiKyokashoN","#000000").set({
            x : buttonCancel.x,
            y : buttonCancel.y - 10,
            textAlign : "center",
        });

        var buttonOk = new createjs.Bitmap(game.assets.images.alarm_button).set({
            regX : 88,
            regY : 30,
            x : 250,
            y : 290,
            scale : 0.7
        });
        var buttonOkText = new createjs.Text("確認" ,"18px UDDigiKyokashoN","#000000").set({
            x : buttonOk.x,
            y : buttonOk.y - 10,
            textAlign : "center",
        });
        var buttonClose = new createjs.Bitmap(game.assets.images.button_close).set({
            regX : 18,
            x : 316,
            y : 70
        });
        buttonClose.addEventListener("click" , function(){
            game.sounds.playSound_1("close");
            self.windowState = false;
            self.closeState = true;
        });
        this.alarmSetObj.addChild(alarmBg , this.hour , this.point , this.minute , hourPlus , hourMinus , minutePlus , minuteMinus , buttonCancel , buttonCancelText , buttonOk , buttonOkText , buttonClose); 
        
        buttonCancel.addEventListener("click" , function(){
            game.sounds.playSound_1("button");
            game.playerData.child("alarm").update({
                alarmOpen : false,
            } , function(){
                self.windowState = false;
                self.closeState = true;
            });
        });
        buttonOk.addEventListener("click" , function(){
            game.sounds.playSound_1("button");
            game.playerData.child("alarm").update({
                alarmOpen : true,
                hour : Number(self.hour.text),
                minute : Number(self.minute.text)
            } , function(){
                self.windowState = false;
                self.closeState = true;
            });
        });

        hourPlus.addEventListener("click" , function(){game.sounds.playSound_1("numbutton");touchstart(1,1)});
        hourMinus.addEventListener("click" , function(){game.sounds.playSound_1("numbutton");touchstart(1,2)});
        minutePlus.addEventListener("click" , function(){game.sounds.playSound_1("numbutton");touchstart(2,1)});
        minuteMinus.addEventListener("click" , function(){game.sounds.playSound_1("numbutton");touchstart(2,2)});

        function touchstart(time , state){
            let number;
            switch(time){
                case 1:
                    switch(state){
                        case 1:
                            number = Number(self.hour.text) + 1;
                            if(number > 23){
                                number = 0;
                            }
                            if(number < 10){
                                self.hour.text = "0" + number;
                            }else{
                                self.hour.text = number;
                            }
                        break;
                        case 2:
                            number = Number(self.hour.text) - 1;
                            if(number < 0){
                                number = 23;
                            }
                            if(number < 10){
                                self.hour.text = "0" + number;
                            }else{
                                self.hour.text = number;
                            }
                        break;
                    }
                break;
                case 2:
                    switch(state){
                        case 1:
                            number = Number(self.minute.text) + 1;
                            if(number > 59){
                                number = 0;
                            }
                            if(number < 10){
                                self.minute.text = "0" + number;
                            }else{
                                self.minute.text = number;
                            }
                        break;
                        case 2:
                            number = Number(self.minute.text) - 1;
                            if(number < 0){
                                number = 59;
                            }
                            if(number < 10){
                                self.minute.text = "0" + number;
                            }else{
                                self.minute.text = number;
                            }
                        break;
                    }
                break;
            }
        }
    }

    Alarm.prototype.alarmOnAddChild = function(){
        var self = this;
        this.alarmOnObj.removeAllChildren();
        
        var alarmBg = new createjs.Bitmap(game.assets.images.alarm_bg_2);
        var title = new createjs.Text("アラーム" ,"30px UDDigiKyokashoN","#5c190f").set({
            x : 180,
            y : 100,
            textAlign : "center",
        });
        var point = new createjs.Text(":" ,"70px UDDigiKyokashoN","#000000").set({
            x : 180,
            y : 160,
            textAlign : "center",
        });
        var hour = new createjs.Text("" ,"70px UDDigiKyokashoN","#000000").set({
            x : point.x - 70,
            y : 160,
            textAlign : "center",
        });
        var minute = new createjs.Text("" ,"70px UDDigiKyokashoN","#000000").set({
            x : point.x + 70,
            y : 160,
            textAlign : "center",
        });
        game.playerObj.alarm.hour < 10 ? hour.text = "0" + game.playerObj.alarm.hour : hour.text = game.playerObj.alarm.hour;
        game.playerObj.alarm.minute < 10 ? minute.text = "0" + game.playerObj.alarm.minute : minute.text = game.playerObj.alarm.minute;
        
        var buttonOk = new createjs.Bitmap(game.assets.images.alarm_button).set({
            regX : 88,
            regY : 30,
            x : 180,
            y : 290,
            scale : 0.7
        });
        buttonOk.addEventListener("click" , function(){
            
            if(self.netState == true){
                self.netState = false;
                self.getItem();
            }
        });
        var buttonOkText = new createjs.Text("起きる" ,"18px UDDigiKyokashoN","#000000").set({
            x : buttonOk.x,
            y : buttonOk.y - 10,
            textAlign : "center",
        });
        this.alarmOnObj.addChild(alarmBg , title , point , hour , minute , buttonOk , buttonOkText);
    }

    Alarm.prototype.getItem = function(){
        var self = this;
        // game.playerObj.alarm.getup = true;
        // var num_1 = Math.random();
        // var num_2 = Math.floor(Math.random() * game.playerObj.level);
        // if(num_1 < 0.6){
        //     var addItenNum = Math.ceil(Math.random() * 3);
        //     if(game.playerObj.depository == undefined){
        //         game.playerObj.depository = {
        //             seed : [{
        //                 id : num_2,
        //                 num : addItenNum
        //             }]
        //         }
        //         game.flower.expUp(Math.ceil(Math.random() * 10) * 10);
        //         game.playerData.set(game.playerObj , function(){
        //             self.netState = true;
        //             game.sounds.playSound_1("get");
        //             self.success(1 , num_2 , addItenNum);
        //         });
        //     }else if(game.playerObj.depository.seed == undefined){
        //         game.playerObj.depository.seed = [{
        //             id : num_2,
        //             num : addItenNum
        //         }];
        //         game.flower.expUp(Math.ceil(Math.random() * 10) * 10);
        //         game.playerData.set(game.playerObj , function(){
        //             self.netState = true;
        //             game.sounds.playSound_1("get");
        //             self.success(1 , num_2 , addItenNum);
        //         });
        //     }else{
        //         for(let n = 0 ; n < game.playerObj.depository.seed.length ; n++){
        //             if(game.playerObj.depository.seed[n].id == num_2){
        //                 game.playerObj.depository.seed[n].num = Number(game.playerObj.depository.seed[n].num) + addItenNum;
        //                 game.flower.expUp(Math.ceil(Math.random() * 10) * 10);
        //                 game.playerData.set(game.playerObj , function(){
        //                     self.netState = true;
        //                     game.sounds.playSound_1("get");
        //                     self.success(1 , num_2 , addItenNum);
        //                 });
        //                 return;
        //             }
        //         }
        //         game.playerObj.depository.seed.push({
        //             id : num_2,
        //             num : addItenNum
        //         });
        //         game.flower.expUp(Math.ceil(Math.random() * 10) * 10);
        //         game.playerData.set(game.playerObj , function(){
        //             self.netState = true;
        //             game.sounds.playSound_1("get");
        //             self.success(1 , num_2 , addItenNum);
        //         });
        //     }
        // }else if(num_1 < 0.9){
        //     var addMoneyNum = Math.ceil(Math.random() * 10) * 30
        //     game.playerObj.money += addMoneyNum;
        //     game.flower.expUp(Math.ceil(Math.random() * 10) * 10);
        //     game.playerData.set(game.playerObj , function(){
        //         self.netState = true;
        //         game.sounds.playSound_1("get");
        //         self.success(3 , "item_chip_2" , addMoneyNum);
        //     });
        // }else{
            var num_1 = Math.ceil(Math.random() * 2)
            game.playerObj.crystal += num_1;
            game.flower.expUp(Math.ceil(Math.random() * 10) * 10);
            game.playerData.set(game.playerObj , function(){
                self.netState = true;
                game.sounds.playSound_1("get");
                self.success(4 , num_1);
            });
        // }
    }

    Alarm.prototype.success = function(state , num){
        var self = this;
        this.alarmOnObj.removeAllChildren();
        var alarmBg = new createjs.Bitmap(game.assets.images.alarm_bg_2);
        var title = new createjs.Text("GET!!!" ,"30px UDDigiKyokashoN","#5c190f").set({
            x : 180,
            y : 100,
            textAlign : "center",
        });
        var itemIcon = new createjs.Bitmap().set({
            x : 150,
            y : 150
        });
        var itemNumber = new createjs.Text("" ,"30px UDDigiKyokashoN","#5c190f").set({
            x : 190,
            y : 200
        });

        switch(state){
            // case 1:
            //     itemIcon.image = game.assets.images["flower_" + game.gameObj.plantData[addItem].name + "_bag"];
            //     itemIcon.regX = 43;
            //     itemNumber.text = "× " + num;
            // break;
            // case 2:
            //     itemIcon.image = game.assets.images["flower_" + game.gameObj.plantData[addItem].name + "_ball"];
            //     itemIcon.regX = 43;
            //     itemNumber.text = "× " + num;
            // break;
            // case 3:
            //     itemIcon.image = game.assets.images[addItem];
            //     itemIcon.regX = 20;
            //     itemIcon.scale = 1.4;
            //     itemNumber.text = "× " + num;
            // break;
            case 4:
                itemIcon.image = game.assets.images.item_crystal_2;
                itemIcon.y = 170;
                itemIcon.regX = 20;
                itemIcon.scale = 1.4;
                itemNumber.text = "× " + num;
            break;
        }
        
        var buttonOk = new createjs.Bitmap(game.assets.images.alarm_button).set({
            regX : 88,
            regY : 30,
            x : 180,
            y : 290,
            scale : 0.7
        });
        buttonOk.addEventListener("click" , function(){
            game.sounds.playSound_1("button");
            self.windowState = false;
            self.closeState = true;
        });
        var buttonOkText = new createjs.Text("OK" ,"18px UDDigiKyokashoN","#000000").set({
            x : buttonOk.x,
            y : buttonOk.y - 10,
            textAlign : "center",
        });

        this.alarmOnObj.addChild(alarmBg , title , itemIcon , itemNumber , buttonOk , buttonOkText);
    }

    Alarm.prototype.setOpen = function(){
        this.alarmObj.visible = true;
        this.alarmSetObj.visible = true;
        this.windowState = true;
        this.openState = true;
    }

    Alarm.prototype.update = function(){
        if(this.openState == true){
            this.alarmObj.alpha += 0.2;
            this.alarmObj.scale = Number((this.alarmObj.scale + 0.12).toFixed(2));
            if(this.alarmObj.alpha >= 1){
                this.alarmObj.scale = 1;
                this.openState = false;
            }
        }
        if(this.closeState == true){
            this.alarmObj.alpha -= 0.2;
            this.alarmObj.scale = Number((this.alarmObj.scale - 0.1).toFixed(2));
            if(this.alarmObj.alpha <= 0){
                this.alarmObj.alpha = 0;
                this.alarmObj.scale = 0.55;
                this.alarmSetObj.visible = false;
                this.alarmOnObj.visible = false;
                this.alarmObj.visible = false;
                this.closeState = false;
                // game.manager.enter(1);
            }
        }
        //game.playerObj.alarm.getup == false
        if(game.playerObj.alarm.alarmOpen == true && this.alarmState == false && game.time.getDate() == game.playerObj.alarm.date && game.time.getHours() == game.playerObj.alarm.hour && game.time.getMinutes() == game.playerObj.alarm.minute){
            console.log("timeNow");
            this.alarmState = true;
            game.sounds.playSound_1("clock");
            this.alarmOnAddChild();
            if(this.windowState == false){
                this.alarmObj.visible = true;
                this.alarmOnObj.visible = true;
                this.openState = true;
            }else{
                this.alarmObj.visible = true;
                this.alarmOnObj.visible = true;
            }
        }
        if(game.time.getHours() != game.playerObj.alarm.hour || game.time.getMinutes() != game.playerObj.alarm.minute){
            this.alarmState = false;
        }
        if(game.time.getDate() != game.playerObj.alarm.date){
            game.playerData.child("alarm").update({
                date : game.time.getDate(),
                getup : false
            });
        }
    }
})()
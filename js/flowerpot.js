(function(){
    var Flowerpot = window.Flowerpot = function(){
        this.fpObj = new createjs.Container();
        this.fp = [];

        var x = game.canvas.width / 4;
        var y = game.canvas.height / 4;
        var j = 0;
        var k = 0;
        for(let i = 0 ;i < game.playerObj.flowerpot.length ; i++){
 
            this.fp[i] = new createjs.Bitmap(game.assets.images.flowerpot_1);

            this.fp[i].regX = 50;
            this.fp[i].regY = 50;
            if(game.canvas.width > 768){
                this.fp[i].x = game.canvas.width / 2 - 192 + 192 * j;
            }else{
                this.fp[i].x = x * (j + 1);
            }
            this.fp[i].y = y + y * k - 5;
            this.fp[i].scale = 0.6;
            this.fpObj.addChild(this.fp[i]);
            if(j < 2){
                j++
            }else{
                j = 0;
                k++;
            }
        }
    }

    Flowerpot.prototype.flower = function(i){
        if(!game.playerObj.flowerpot[i].have){
            game.playerData.child('flowerpot/' + i).update({
                have : 1,
                id : Math.floor(Math.random()*10)
            });
        }
    }

    Flowerpot.prototype.bindEvent = function(name){
        var self = this;
        switch(name){
            case "water":
                for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                    if(game.playerObj.flowerpot[i].have){
                        self.fp[i].addEventListener("click",function(){
                            game.flower.watering(i);
                        });
                    }
                }
            break;
            case "flower":
                for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
                    self.fp[i].addEventListener("click",function(){
                        self.flower(i);
                    });
                }
            break;
        }
    }

    Flowerpot.prototype.removeEvent = function(){
        for (let i = 0 ; i < game.playerObj.flowerpot.length ; i++) {
            this.fp[i].removeAllEventListeners("click");
        }
    }

})()
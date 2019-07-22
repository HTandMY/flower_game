(function(){
    var Game = window.Game = function(){
        this.canvas = document.getElementById("game");
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.assets = {images:[],sounds:[]};
        this.gameObj = {"playerdata" : {"playerid" : 123456 , "fpNum" : 9},
                        "flowerpot" : [{"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0},
                                       {"water" : 0 , "watertime" : 0 , "have" : 0 , "time" : 0}],
                        "nowtime" : 0,
                        "itemNum" : 20
                    };
        this.stage = new createjs.Stage("game");
        var self = this;
        this.loading(function(){
            console.log(self.assets);
            self.startGame()
        });
    }
    
    Game.prototype.loading = function(callback){
        var self = this;
        loadFont();
        function loadFont(){
            document.fonts.load('12px "UDDigiKyokashoN"').then(
                function(){
                    loadImg();
                });
        }
        function loadImg(){
            var readyNum = 0;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    var gameData = JSON.parse(xhr.responseText);
                    for(let i = 0; i < gameData.images.length; i++){
                        self.assets.images[gameData.images[i].name] = new Image();
                        self.assets.images[gameData.images[i].name].src = gameData.images[i].url;
                    }
                    callback();
                }
            }
            xhr.open("get","game.json",true);
            xhr.send(null);
        }
    }
    
    Game.prototype.startGame = function(){
        this.manager = new Manager();
        var self = this;
        createjs.Ticker.framerate = 30;
        createjs.Ticker.addEventListener("tick", start);
        function start(){
            self.gameObj.nowtime = new Date().getTime();
            self.manager.update();
            self.stage.update();
        }
    }
})()
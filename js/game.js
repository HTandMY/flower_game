(function(){
    var Game = window.Game = function(){
        this.canvas = document.getElementById("game");
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.assets = {images:[],sounds:[]};
        console.log(login.userId);

        this.stage = new createjs.Stage("game");
        var self = this;
        this.loading(function(){
            console.log(self.assets);
            self.playerData = firebase.database().ref('playerdata/' + login.userId);
            self.playerData.once('value', function(data) {
                self.gameObj = data.val();
                self.startGame();
            });
            
        });
    }
    
    Game.prototype.loading = function(callback){
        var self = this;
        loadFont();
        function loadFont(){
            document.fonts.load('12px "UDDigiKyokashoN"').then(function(){
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
        var self = this;
        this.playerData.on('value', function(data) {
            self.gameObj = data.val();
        });
        this.manager = new Manager();
        createjs.Ticker.framerate = 30;
        createjs.Ticker.addEventListener("tick", start);
        function start(){
            self.nowtime = new Date().getTime();
            self.manager.update();
            self.stage.update();
        }
    }
})()
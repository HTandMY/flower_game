(function(){
    var Game = window.Game = function(){
        this.canvas = document.getElementById("game");
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.assets = {images:[],sounds:[]};
        console.log(login.userId);

        this.playerData = firebase.database().ref('playerdata/' + login.userId);
        this.gameData = firebase.database().ref('gameData');

        this.stage = new createjs.Stage("game");
        var self = this;
        this.loading();
    }
    
    Game.prototype.loading = function(){
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
                    for(let i = 0; i < gameData.sounds.length; i++){
                        self.assets.sounds[gameData.sounds[i].name] = new Audio();
                        self.assets.sounds[gameData.sounds[i].name].src = gameData.sounds[i].url;
                    }
                    loadGameData();
                }
            }
            xhr.open("get","game.json",true);
            xhr.send(null);
        }
        function loadGameData(){
            self.gameData.once('value', function(data) {
                self.gameObj = data.val();
                loadPlayerData()
            });
        }
        function loadPlayerData(){
            self.playerData.once('value', function(data) {
                self.playerObj = data.val();
                self.startGame();
            });
        }
    }
    
    Game.prototype.startGame = function(){
        var self = this;
        this.playerData.on('value', function(data) {
            self.playerObj = data.val();
        });
        this.time = new Date();
        this.manager = new Manager();
        createjs.Ticker.framerate = 30;
        createjs.Ticker.addEventListener("tick", start);
        function start(){
            self.time = new Date();
            self.nowtime = self.time.getTime();
            self.manager.update();
            self.stage.update();
        }
    }
})()
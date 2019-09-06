(function(){
    var Sounds = window.Sounds = function(){
        this.bgm = new Audio();
        this.sound_1 = new Audio();
        this.sound_2 = new Audio();

        this.gameStart();
    }

    Sounds.prototype.gameStart = function(){
        this.bgm.src = game.assets.sounds[game.gameObj.decorationData[game.playerObj.bgm].itemname].src;
        this.bgm.loop = true;
        this.bgm.play();
    }
})()
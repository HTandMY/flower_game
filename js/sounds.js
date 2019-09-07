(function(){
    var Sounds = window.Sounds = function(){
        this.bgm = new Audio();
        this.sound_1 = new Audio();
        this.sound_2 = new Audio();

        this.bgm.loop = true;
        this.sound_1.loop = false;
        this.sound_2.loop = false;

        this.gameStart();
    }

    Sounds.prototype.gameStart = function(){
        this.bgm.src = game.assets.sounds[game.gameObj.decorationData[game.playerObj.bgm].itemname].src;
        this.bgm.play();
    }

    Sounds.prototype.playSound_1 = function(name){
        this.sound_1.src = game.assets.sounds[name].src;
        this.sound_1.play();
    }

    Sounds.prototype.playSound_2 = function(name){
        this.sound_2.src = game.assets.sounds[name].src;
        this.sound_2.play();
    }

    Sounds.prototype.stopAll = function(){
        this.bgm.pause();
        this.sound_1.pause();
        this.sound_2.pause();
    }
})()
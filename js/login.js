(function(){
    var Login = window.Login = function(){
        this.firebaseConfig = {
            apiKey: "AIzaSyCwYyQCtYztQrxVQYmHcxw0HknJGKc7AbQ",
            authDomain: "gamedata-6d071.firebaseapp.com",
            databaseURL: "https://gamedata-6d071.firebaseio.com",
            projectId: "gamedata-6d071",
            storageBucket: "gamedata-6d071.appspot.com",
            messagingSenderId: "860639608980",
            appId: "1:860639608980:web:1e1b1893ce24c9a0"
        };
        firebase.initializeApp(this.firebaseConfig);
        this.loginBox = document.getElementById("loginBox");
        this.gameBox = document.getElementById("gameBox");
    }

    Login.prototype.check = function(){
        this.userId = document.getElementById("userId").value;
        let psd = document.getElementById("psd").value;
        let userlist = this.changeAddress('playerdata');
        if(this.userId == ""){
            console.log("请输入用户名");
            return;
        }
        if(psd == ""){
            console.log("请输入密码");
            return;
        }
        this.backData = userlist.child(this.userId);
        this.backData.on('value', function(data){
            let playerData = data.val();
            if(playerData == null || playerData == undefined || playerData == ""){
                console.log("用户名不存在");
                return;
            }else{
                let hash = md5(psd);
                if(playerData.psd != hash){
                    console.log(hash);
                    console.log(playerData.psd);
                    console.log("密码错误");
                }else{
                    console.log(hash);
                    console.log(playerData.psd);
                    console.log("密码正确");
                    this.loginBox.style.display = "none";
                    this.gameBox.style.display = "block";
                    window.game = new Game(playerData);
                }
            }
        });
    }

    Login.prototype.changeAddress = function(address){
        return firebase.database().ref(address);
    }

    Login.prototype.readData = function(data){
        var playerData = data.val();
        console.log(playerData);
    }
})()
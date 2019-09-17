(function(){
    var Login = window.Login = function(){
        var self = this;
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
        this.tips = document.getElementById("tips");
        var doLoading;
        var loadingBox = document.getElementById("loading");
        window.onload = function(){
            doLoading = setTimeout(function(){
                loadingBox.remove();
                this.loginBox.style.display = "block";
            }, 1000);
        };
        loadingBox.addEventListener('click',function(){
            loadingBox.remove();
            self.loginBox.style.display = "block";
            clearTimeout(doLoading);
        },false);
    }

    Login.prototype.tipsClear = function(){
        this.tips.innerHTML = "";
    }

    Login.prototype.check = function(){
        this.userId = document.getElementById("userId").value;
        let psd = document.getElementById("psd").value;
        let userlist = firebase.database().ref('playerdata/' + this.userId);
        if(this.userId == ""){
            console.log("请输入用户名");
            this.tips.innerHTML = "＊ユーザーIDを入力してください。";
            return;
        }
        if(psd == ""){
            console.log("请输入密码");
            this.tips.innerHTML = "＊パスワードを入力してください。";
            return;
        }
        this.backData = userlist;
        this.backData.once('value', function(data){
            let playerData = data.val();
            if(playerData == null || playerData == undefined || playerData == ""){
                console.log("用户名不存在");
                this.tips.innerHTML = "＊ユーザー名が見つかりません";
                return;
            }else{
                let hash = md5(psd);
                if(playerData.psd != hash){
                    console.log(hash);
                    console.log(playerData.psd);
                    console.log("密码错误");
                    this.tips.innerHTML = "＊パスワードを確認してください。";
                }else{
                    console.log(hash);
                    console.log(playerData.psd);
                    console.log("密码正确");
                    this.loginBox.style.display = "none";
                    this.gameBox.style.display = "block";
                    window.game = new Game();
                }
            }
        });
    }
})()
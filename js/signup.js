var firebaseConfig = {
    apiKey: "AIzaSyCwYyQCtYztQrxVQYmHcxw0HknJGKc7AbQ",
    authDomain: "gamedata-6d071.firebaseapp.com",
    databaseURL: "https://gamedata-6d071.firebaseio.com",
    projectId: "gamedata-6d071",
    storageBucket: "gamedata-6d071.appspot.com",
    messagingSenderId: "860639608980",
    appId: "1:860639608980:web:1e1b1893ce24c9a0"
};
firebase.initializeApp(this.firebaseConfig);

var tips = document.getElementById("tips");

function signUp(){
    console.log("1");
    var userName = document.getElementById("userName").value;
    var userId = document.getElementById("userId").value;
    var psd = document.getElementById("psd").value;
    var md5psd = md5(psd);
    var gameJson = {
        "crystal" : 0,
        "exp" : 0,
        "depository" : {
            "decoration" : {
                "decoration_bg_01" : {"class" : 1},
                "decoration_flowerpot_01" : {"class" : 0}
            }
        },
        "flowerpot" : [ {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        }, {
            "have" : 0,
            "id" : -1,
            "time" : 0,
            "water" : 0,
            "watertime" : 0,
            "flowerpot" : "decoration_flowerpot_01"
        } ],
        "bgm" : "decoration_sound_01",
        "level" : 1,
        "money" : 30,
        "playername" : userName,
        "psd" : md5psd,
        "wallpaper" : "decoration_bg_01",
        "alarm" : {
            "alarmOpen" : false,
            "date" : 1,
            "getup" : false,
            "hour" : 0,
            "minute" : 0
        }
    }
    if(userName == ""){
        console.log("请输入用户名");
        tips.innerHTML = "＊ユーザー名を入力してください。";
        return;
    }
    if(userId == ""){
        console.log("请输入用户名");
        tips.innerHTML = "＊ユーザーIDを入力してください。";
        return;
    }
    if(psd == ""){
        console.log("请输入密码");
        tips.innerHTML = "＊パスワードを入力してください。";
        return;
    }
    var userlist = firebase.database().ref('playerdata/' + userId);
    userlist.once('value', function(data){
        var playerData = data.val();
        if(playerData == null || playerData == undefined || playerData == ""){
            console.log(md5psd);
            var addData = firebase.database().ref('playerdata');
            addData.child(userId).set(gameJson , function(){
                tips.style.color = "green";
                tips.innerHTML = "＊登録成功しました！";
            });
        }else{
            tips.style.color = "red";
            tips.innerHTML = "＊ユーザーIDが存在しました";
            return;
        }
    })
}

function tipsClear(){
    tips.innerHTML = "";
}
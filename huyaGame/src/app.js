var game = new Phaser.Game(375, 460, Phaser.AUTO, 'game');
var huya;
var layer; //背景图层
var huyafly; //飞行动画
var chusheng = 30;
var shuimu1;
var shuimu2;
var shuimu3;
var shuimu4;
var shuimu5;
var shuimu1fly;
var shuimu2fly;
var shuimu3fly;
var hitShuimu4flag = false;
var hitShuimuflag = false;
var jian;
var count = 0;
var disX = 0;
var zhangai3Group;
var zhangai3_1Group;
var zhangai5Group;
var flagone = true;
var zhangaiGroup;
var loading1
var scoreText; //得分的文字说明，添加到舞台上
var dimianGroup;
var onfloor;
var dimian1;
var dimian2;
var dimian3;
game.states = {};

game.states.boot = function () {
    this.preload = function () {
            
        },
        this.create = function () {
            this.state.start('menu');
        }
}
game.states.menu = function () {
    var progressText;
    this.init = function () {
        game.stage.backgroundColor = "0XF1AE93";
        progressText = game.add.text(game.world.centerX, game.world.centerY - 50, '0%', {
            fill: '#fff',
            fontSize: '16px'
        });
        progressText.anchor = {
            x: 0.5,
            y: 0.5
        };
        
    }
    //JSON.stringify(map3Img)
    this.preload = function () {
        game.load.image('map','./src/assets/img/map3.png');
        //game.load.tilemap('bgmap', './src/assets/img/map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mario','./src/assets/img/mytiled.png');
        game.load.image('huya', "./src/assets/img/huya.png");
        game.load.image('huya2', "./src/assets/img/huya2.png");
        game.load.image('shuimu1','./src/assets/img/shuimu1.png');
        game.load.image('blueshuimu', './src/assets/img/blueshuimu2.png');
        game.load.image('jian', './src/assets/img/jian.png');
        game.load.image('zhangai2', './src/assets/img/zhangai2.png');
        game.load.image('zhangai3', './src/assets/img/zhangai3.png');
        game.load.image('zhangai4', './src/assets/img/zhangai4.png');
        game.load.image('zhangai5', './src/assets/img/zhangai5.png');
        game.load.image('button', './src/assets/img/button.png');
        game.load.image('dici', './src/assets/img/dici.png');
        game.load.image('tips', './src/assets/img/tips.png');
        game.load.image('dimian1', './src/assets/img/dimian1.png');
        game.load.image('dimian2', './src/assets/img/dimian2.png');
        game.load.image('dimian3', './src/assets/img/dimian3.png');
        game.load.image('bengchuang', './src/assets/img/bengchuang.png');
        game.load.onFileComplete.add(function (progress) {
            progressText.text = progress + '%';
        })
    }
    this.create = function () {



        this.startButton = this.add.sprite(game.width / 2, game.height / 2, 'button');
        this.huya2 = this.add.sprite(game.width / 2 - 30, game.height / 2 - 80, 'huya2');
        this.startButton.anchor.set(0.5);
        this.startButton.inputEnabled = true;
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputDown.add(this.startGame, this);

        this.tips = this.add.sprite(game.width / 2, game.height / 2, 'tips');
        //this.huya2 =  this.add.sprite(game.width / 2 - 30, game.height / 2 -80, 'huya2');
        this.tips.anchor.set(0.5);
        this.tips.scale.setTo(0.8);
        this.tips.inputEnabled = true;
        this.tips.input.useHandCursor = true;
        this.tips.events.onInputDown.add(this.startGame1, this);
    }
    this.startGame1 = function () {
        this.tips.destroy();
    }
    this.startGame = function () {
        this.startButton.destroy();
        count = 0;
        game.state.start('start');
    }
}

game.states.start = function () {
    this.create = function () {
        game.world.setBounds(0,0,4320,480);
        flagone = true;
        game.stage.setBackgroundColor(0x588DBE);
        // var map = game.add.tilemap('bgmap');
        // map.addTilesetImage('mytiled', 'mario');
        // layer = map.createLayer('map3_1');
        // layer.resizeWorld();

        // map.setCollisionBetween(95, 96);
        // map.setCollision(37);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // huya = game.add.sprite(20,250,'huyasp');
        // huya.animations.add('run',[0,,2,3,4]);
        // huya.animations.add('jump',[5,7,6,8,9]);
        // huya.play('run',10,true);

        this.map = game.add.sprite(0,0,'map');
        huya = game.add.sprite(chusheng, 250, 'huya');


        game.physics.enable(huya);
        huya.body.gravity.y = 220;
        huya.anchor.set(0.5);

        huya.body.setCircle(huya.width / 2.5, 10, 2);
        //弹跳不起作用？？？
        //huya.body.bounce.y = 0.5;
        console.log(huya.x);
        game.input.onDown.add(this.move, this);

        dimianGroup = game.add.group();
        //地面
        dimian1 = game.add.sprite(0, 385, 'dimian1');
        dimian2 = game.add.sprite(3200, 385, 'dimian2');
        dimian3 = game.add.sprite(2032, 240, 'dimian3');
        this.dimian4 = game.add.sprite(2128, 300, 'dimian3');
        this.dimian5 = game.add.sprite(2220, 300, 'dimian3');
        this.dimian6 = game.add.sprite(2032, 300, 'dimian3');
        this.dimian7 = game.add.sprite(2752+16, 337, 'dimian3');
        this.dimian8 = game.add.sprite(2848+16, 385, 'dimian3');
        this.dimian9 = game.add.sprite(2944+16, 385, 'dimian3');
        this.dimian10 = game.add.sprite(3104-16, 270, 'dimian3');
        this.dimian11 = game.add.sprite(1680, 160, 'dimian3');

        dimianGroup.add(dimian1)
        dimianGroup.add(dimian2)
        dimianGroup.add(dimian3)
        dimianGroup.add(this.dimian4)
        dimianGroup.add(this.dimian5)
        dimianGroup.add(this.dimian6)
        dimianGroup.add(this.dimian7)
        dimianGroup.add(this.dimian8)
        dimianGroup.add(this.dimian9)
        dimianGroup.add(this.dimian10)
        dimianGroup.add(this.dimian11)

        
        game.physics.arcade.enable(dimianGroup); //对land对象开启物理引擎

        dimianGroup.forEach(function (item) {
            game.physics.arcade.enable(item);
            item.body.allowGravity = false; //不用重力
            item.body.immovable = true; //不可移动的，别的物体碰到后会反弹
        }, this);

        game.physics.arcade.collide(huya, dimianGroup);

        //水母
        shuimu1 = game.add.sprite(1850, 120, 'shuimu1');
        game.physics.enable(shuimu1);
        shuimu1.body.setSize(10, 10, 10, 0);
 
        game.physics.enable(shuimu1);

        shuimu2 = game.add.sprite(1450 + 964, 220, 'shuimu1');
        game.physics.enable(shuimu2);
        shuimu2.body.setSize(1, 10, shuimu2.width / 2, 0);

        game.physics.enable(shuimu2);

        shuimu3 = game.add.sprite(1570 + 964, 210, 'shuimu1');
        game.physics.enable(shuimu3);
        shuimu3.body.setSize(1, 10, shuimu3.width / 2, 0);
 
        game.physics.enable(shuimu3);

        //跳跳水母
        shuimu4 = game.add.sprite(2000 + 964 + 5, 250, 'blueshuimu');
        game.physics.enable(shuimu4);
        shuimu4.body.setSize(1, 10, shuimu4.width / 2, 0);
        game.physics.enable(shuimu4);

        shuimu5 = game.add.sprite(1680 + 964, 220, 'blueshuimu');
        game.physics.enable(shuimu5);
        shuimu5.body.setSize(1, 10, shuimu5.width / 2, 0);
        game.physics.enable(shuimu5);

        //剑
        jian = game.add.sprite(2300 + 964, 230, 'jian');
        game.physics.enable(jian);
        jian.scale.setTo(0.55);
        this.jiantween = game.add.tween(jian.scale)
        this.jiantween.to({
            x: 0.5,
            y: 0.5
        }, 1000, Phaser.Easing.Bounce.out, true, 0, -1, true);

        // 障碍2  虎牙小房子
        this.zhangai2 = game.add.sprite(2400 + 964, 0, 'zhangai2');
        game.physics.enable(this.zhangai2);
        this.zhangai2.scale.setTo(0.8);

        this.zhangai2_1 = game.add.sprite(180, 0, 'zhangai2');
        game.physics.enable(this.zhangai2_1);
        this.zhangai2_1.scale.setTo(0.8);

        //地刺
        this.dici = game.add.sprite(205, 330, 'dici');
        this.dici.scale.setTo(0.6);
        game.physics.enable(this.dici);

        this.dici_1 = game.add.sprite(2425 + 964, 330, 'dici');
        this.dici_1.scale.setTo(0.6);
        game.physics.enable(this.dici_1);

        //障碍3  七夕
        zhangai3Group = game.add.group();
        zhangai3_1Group = game.add.group();
        initZhangai3_1();
        initZhangai3();
        moveZhangai3_1();
        game.time.events.loop(2400, moveZhangai3_1, this);

        //障碍5 云朵
        zhangai5Group = game.add.group();
        initZhangai5();
        moveZhangai5();
        game.time.events.loop(1800, moveZhangai5, this);


        //障碍4 路标
        this.zhangai4 = game.add.sprite(3000 + 964, 205, 'zhangai4');
        game.physics.enable(this.zhangai4);
        this.zhangai4.scale.setTo(0.6);
        this.zhangai4.body.setSize(120, 300, 35, 10);

        this.zhangai4_1 = game.add.sprite(770, 205, 'zhangai4');
        game.physics.enable(this.zhangai4_1);
        this.zhangai4_1.scale.setTo(0.6);
        this.zhangai4_1.body.setSize(120, 300, 35, 10);

        //蹦床
        this.bengchuang = game.add.sprite(1480, 360, 'bengchuang');
        game.physics.enable(this.bengchuang);
        this.bengchuang.scale.setTo(0.4);

        zhangaiGroup = game.add.group();
        zhangaiGroup.add(this.zhangai2);
        zhangaiGroup.add(this.zhangai2_1);
        zhangaiGroup.add(this.zhangai4);
        zhangaiGroup.add(this.zhangai4_1);
        zhangaiGroup.add(this.dici);
        zhangaiGroup.add(this.dici_1);


    }
    this.update = function () {
        game.physics.arcade.collide(huya, dimianGroup,this.onfloor1,null,this);
        if (huya.y >= game.height) {
            this.gameOver();
        }
        game.camera.follow(huya);

        if (huya.x - this.zhangai4_1.x > 360 && flagone) {
            count += 1;
            flagone = false;
            game.input.onDown.remove(this.move, this);
            game.input.onDown.add(this.fly, this);

        }
        if (huya.x > 4200) {
            this.gamefinish();
        }
        if (count == 1) {
            huya.x += 1.6;
            //game.camera.x +=1.6
            if (huya.body.velocity.y < 0 && huya.body.velocity.y > -10) {
                huya.body.velocity.y = 200;
            }

        }
        game.physics.arcade.collide(huya, layer, this.test);
        game.physics.arcade.overlap(huya, shuimu1, this.hitShuimu1, null, this);
        game.physics.arcade.overlap(huya, this.bengchuang, this.beng, null, this);
        game.physics.arcade.overlap(huya, shuimu2, this.hitShuimu2, null, this);
        game.physics.arcade.overlap(huya, shuimu3, this.hitShuimu3, null, this);
        game.physics.arcade.overlap(huya, shuimu5, this.hitShuimu5, null, this);
        game.physics.arcade.overlap(huya, zhangaiGroup, this.gameOver, null, this);
        game.physics.arcade.overlap(huya, zhangai3Group, this.gameOver, null, this);
        game.physics.arcade.overlap(huya, zhangai5Group, this.gameOver, null, this);
        game.physics.arcade.overlap(huya, zhangai3_1Group, this.gameOver, null, this);

        if (!hitShuimu4flag) {
            game.physics.arcade.overlap(huya, shuimu4, this.hitShuimu4, null, this);
        }
        game.physics.arcade.overlap(huya, jian, this.getjian, null, this);

        if (count == 2 || count == 0) {
            huya.x += 0.4;
            if (onfloor) {
                huya.body.velocity.y = -300;
            }
            if(huya.body.velocity.y<-280){
                onfloor = false;
            }
        }
        if (huya.x - disX > 200) {
            huya.body.velocity.x = 0;
            huya.body.acceleration.x = 0;
            huya.body.gravity.y = 220;
            huya.body.acceleration.x = 0;
        }



    }
    this.onfloor1 = function(){
        onfloor = true;
    }
    this.gamefinish = function () {
        game.state.start('stop2');
    }
    this.gameOver = function () {
        huya.body.velocity.x = 0;
        huya.body.velocity.y = 300;
        huya.scale.setTo(0.8);
        huya.body.angularVelocity = 1000;
        setTimeout(function () {
            game.state.start('stop');
        }, 1000);
    }
    this.test = function () {
        huya.body.gravity.y = 220;
        huya.body.velocity.y = 0;
    }
    this.fly = function () {
        
        if (onfloor || hitShuimuflag) {
            hitShuimuflag = false;
            onfloor = false;
            huya.body.velocity.y = -220;
            huya.body.gravity.y = 220;
        }
    }
    this.hitShuimu1 = function () {
        shuimu1fly = game.add.tween(shuimu1)
        huya.body.gravity.y = 120;
        shuimu1fly.to({
            y: huya.y + 26,
            x: huya.x - 12,
        }, 10, Phaser.Easing.Linear.None, true, 0, 0, false);
        hitShuimuflag = true;
    }
    this.hitShuimu2 = function () {
        shuimu2fly = game.add.tween(shuimu2)
        huya.body.gravity.y = 120;
        shuimu2fly.to({
            y: huya.y + 26,
            x: huya.x - 12,
        }, 10, Phaser.Easing.Linear.None, true, 0, 0, false);
        hitShuimuflag = true;
    }
    this.hitShuimu3 = function () {
        shuimu3fly = game.add.tween(shuimu3)
        huya.body.gravity.y = 120;
        shuimu3fly.to({
            y: huya.y + 26,
            x: huya.x - 12,
        }, 10, Phaser.Easing.Linear.None, true, 0, 0, false);
        hitShuimuflag = true;
    }
    this.hitShuimu4 = function () {
        hitShuimu4flag = true;
        hitShuimuflag = true;
        game.add.tween(shuimu4).to({
            y: shuimu4.y + 26,

        }, 100, Phaser.Easing.Bounce.out, true, 0, 1, true);
        if (onfloor || hitShuimuflag) {
            hitShuimuflag = false;
            huyafly = game.add.tween(huya)
            huya.body.velocity.y = -200;
            huya.body.gravity.y = 300;
        }
    }
    this.hitShuimu5 = function () {
        hitShuimuflag = true;
        game.add.tween(shuimu5).to({
            y: shuimu4.y + 26,

        }, 100, Phaser.Easing.Bounce.out, true, 0, 1, true);
        if (onfloor || hitShuimuflag) {
            hitShuimuflag = false;
            huyafly = game.add.tween(huya)
            huya.body.velocity.y = -200;
            huya.body.gravity.y = 300;
        }
    }
    this.getjian = function () {
        count += 1;
        jian.destroy();
        moveZhangai3();
        game.time.events.loop(2400, moveZhangai3, this);
        game.input.onDown.remove(this.fly, this);
        game.input.onDown.add(this.move, this);
    }
    this.beng = function () {
        huya.body.velocity.y = -320;
    }
    this.drop = function () {
        huya.body.gravity.y = 500;
    }
    this.move = function () {
        disX = huya.x;
        huya.body.velocity.x = 200;
        huya.body.acceleration.x = 1000;
        huya.body.velocity.y = 0;
        huya.body.gravity.y = 0;
    }
    this.render = function () {
        // if (this.temp) {
        //     game.debug.body(this.temp);
        //     game.debug.geom(new Phaser.Point(this.temp.x, this.temp.y), '#ffff00');
        // }
        // game.debug.body(shuimu1);
        // game.debug.body(shuimu4);
        // game.debug.body(huya);
        // game.debug.body(this.zhangai4_1);
        //game.debug.body(zhangaiChild);
        // game.debug.geom(new Phaser.Point(qipao.x, qipao.y), '#ffff00');

        //game.debug.geom(new Phaser.Point(this.temp.x, this.temp.y), '#ffff00');

    }
}
game.states.stop = function () {
    this.create = function () {
        scoreText = game.add.text(game.width / 2, game.height / 2 + 50, "您带着小虎牙游历了" + parseInt(huya.x) + "米 \n 排名XXX \n 前三名将获取主播赠送的小礼物哦 \n （数据晚10点更新）", {
            font: "16px Arial",
            fill: "#FFFFFF"
        });
        huya.destroy();
        this.startButton = this.add.sprite(game.width / 2, game.height / 2 - 60, 'button');
        this.startButton.anchor.set(0.5);
        this.startButton.inputEnabled = true;
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputDown.add(this.startGame, this);
        count  = 0;
        scoreText.anchor.set(0.5);

    }
    this.startGame = function () {
        console.log(count);
        if(huya){
            huya.destroy();
        }
        this.startButton.destroy();
        game.state.start('start');
    }
}

game.states.stop2 = function () {
    this.create = function () {
        scoreText = game.add.text(game.width / 2, game.height / 2 + 50, "未完待续，尽请期待！！", {
            font: "16px Arial",
            fill: "#FFFFFF"
        });
        huya.destroy();
        this.startButton = this.add.sprite(game.width / 2, game.height / 2 - 60, 'button');
        this.startButton.anchor.set(0.5);
        this.startButton.inputEnabled = true;
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputDown.add(this.startGame, this);

        scoreText.anchor.set(0.5);

    }
    this.startGame = function () {
        this.startButton.destroy();

        game.state.start('start');
    }

}

//初始化障碍3
function initZhangai3() {
    for (let i = 0; i < 4; i++) {
        var zhangai3 = game.add.sprite(2500, 290, 'zhangai3');
        game.physics.arcade.enable(zhangai3);
        zhangai3.scale.setTo(0.5);
        zhangai3.anchor.set(0.5);
        //zhangai3.body.angularVelocity = 50;
        zhangai3.alive = false;
        zhangai3.visible = false;
        zhangai3Group.add(zhangai3);
    }
    zhangai3Group.setAll('checkWorldBounds', true); //边界检测
    zhangai3Group.setAll('outOfBoundsKill', true); //出边界后自动kill
}

function initZhangai5() {
    for (let i = 0; i < 4; i++) {
        var zhangai5 = game.add.sprite(1100, 290, 'zhangai5');
        game.physics.arcade.enable(zhangai5);
        zhangai5.scale.setTo(0.5);
        zhangai5.anchor.set(0.5);
        //zhangai5.body.angularVelocity = 50;
        zhangai5.alive = false;
        zhangai5.visible = false;
        zhangai5Group.add(zhangai5);
    }
    zhangai5Group.setAll('checkWorldBounds', true); //边界检测
    zhangai5Group.setAll('outOfBoundsKill', true); //出边界后自动kill
}

function initZhangai3_1() {
    for (let i = 0; i < 4; i++) {
        var zhangai3 = game.add.sprite(520, 290, 'zhangai3');
        game.physics.arcade.enable(zhangai3);
        zhangai3.scale.setTo(0.5);
        zhangai3.anchor.set(0.5);
        //zhangai3.body.angularVelocity = 50;
        zhangai3.alive = false;
        zhangai3.visible = false;
        zhangai3_1Group.add(zhangai3);
    }
    zhangai3_1Group.setAll('checkWorldBounds', true); //边界检测
    zhangai3_1Group.setAll('outOfBoundsKill', true); //出边界后自动kill
}
//移动障碍3
function moveZhangai3() {
    var zhangaiChild = zhangai3Group.getFirstDead();
    if (zhangaiChild != null) {
        zhangaiChild.reset(2740 + 964, game.height);
        zhangaiChild.body.velocity.y = -100;
        zhangaiChild.body.setSize(240, 80, 35, 10);

    }
}

function moveZhangai3_1() {
    var zhangaiChild = zhangai3_1Group.getFirstDead();
    if (zhangaiChild != null) {
        zhangaiChild.reset(520, game.height);
        zhangaiChild.body.velocity.y = -100;
        zhangaiChild.body.setSize(240, 80, 35, 10);
    }
}

function moveZhangai5() {
    var zhangaiChild = zhangai5Group.getFirstDead();
    if (zhangaiChild != null) {
        zhangaiChild.reset(1100, 0);
        zhangaiChild.body.velocity.y = 100;
    }
}

game.state.add('menu', game.states.menu);
game.state.add('start', game.states.start);
game.state.add('stop', game.states.stop);
game.state.add('stop2', game.states.stop2);
game.state.start('menu');
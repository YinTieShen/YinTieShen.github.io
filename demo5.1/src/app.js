// import './assets/scss/common.scss'
// //Require this, window.$ is then available in the browser console.
// //https://webpack.js.org/loaders/expose-loader/
// require("expose-loader?$!jquery");
// console.log($('#root'))


var game = new Phaser.Game(375, 460, Phaser.AUTO, 'game');
var huya;
var layer; //背景图层
var huyafly; //飞行动画
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
var count = 1;
var disX = 0;
var zhangai3Group;
game.states = {};


game.states.menu = function () {
    this.preload = function () {
        game.load.tilemap('bgmap', './src/assets/img/map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mario', './src/assets/img/mytiled.png');
        game.load.image('huya', './src/assets/img/huya.png');
        game.load.image('shuimu1', './src/assets/img/shuimu1.png');
        game.load.image('blueshuimu', './src/assets/img/blueshuimu2.png');
        game.load.image('jian', './src/assets/img/jian.png');
        game.load.image('qipao', './src/assets/img/qipao.png');
        game.load.image('zhangai2', './src/assets/img/zhangai2.png');
        game.load.image('zhangai3', './src/assets/img/zhangai3.png');
        game.load.image('zhangai4', './src/assets/img/zhangai4.png');
        game.load.image('button', './src/assets/img/button.png');
       // game.load.atlasXML('huyasp', 'assets/img/sprites.png', 'assets/img/sprites.xml');
    }
    this.create = function () {
        this.startButton = this.add.sprite(game.width / 2, game.height / 2, 'button');
        this.startButton.anchor.set(0.5);
        this.startButton.inputEnabled = true;
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputDown.add(this.startGame, this);
    }
    this.startGame = function () {
        this.startButton.destroy();
        game.state.start('start');
    }
}

game.states.start = function () {
    this.create = function () {
        game.stage.setBackgroundColor(0x588DBE);
        var map = game.add.tilemap('bgmap');
        map.addTilesetImage('mytiled', 'mario');
        layer = map.createLayer('map3_1');
        layer.resizeWorld();

        map.setCollisionBetween(95, 96);
        map.setCollision(37);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // huya = game.add.sprite(20,250,'huyasp');
        // huya.animations.add('run',[0,,2,3,4]);
        // huya.animations.add('jump',[5,7,6,8,9]);
        // huya.play('run',10,true);


        huya = game.add.sprite(40, 250, 'huya');


        game.physics.enable(huya);
        huya.body.gravity.y = 220;
        huya.anchor.set(0.5);
        console.log(huya.width)
        huya.body.setCircle(huya.width / 2.5, 10, 2);
        //弹跳不起作用？？？
        huya.body.bounce.y = 0.5;

        game.input.onDown.add(this.fly, this);

        //水母
        shuimu1 = game.add.sprite(886, 120, 'shuimu1');
        game.physics.enable(shuimu1);
        shuimu1.body.setSize(10, 10, 10, 0);
        console.log(shuimu1.body.width);
        game.physics.enable(shuimu1);

        shuimu2 = game.add.sprite(1450, 220, 'shuimu1');
        game.physics.enable(shuimu2);
        shuimu2.body.setSize(1, 10, shuimu2.width / 2, 0);
        console.log(shuimu2.body.width);
        game.physics.enable(shuimu2);

        shuimu3 = game.add.sprite(1570, 210, 'shuimu1');
        game.physics.enable(shuimu3);
        shuimu3.body.setSize(1, 10, shuimu3.width / 2, 0);
        console.log(shuimu3.body.width);
        game.physics.enable(shuimu3);

        //跳跳水母
        shuimu4 = game.add.sprite(2000, 250, 'blueshuimu');
        game.physics.enable(shuimu4);
        shuimu4.body.setSize(1, 10, shuimu4.width / 2, 0);
        game.physics.enable(shuimu4);

        shuimu5 = game.add.sprite(1680, 220, 'blueshuimu');
        game.physics.enable(shuimu5);
        shuimu5.body.setSize(1, 10, shuimu5.width / 2, 0);
        game.physics.enable(shuimu5);

        //剑
        jian = game.add.sprite(2300, 230, 'jian');
        game.physics.enable(jian);
        jian.scale.setTo(0.55);
        this.jiantween = game.add.tween(jian.scale)
        this.jiantween.to({
            x: 0.5,
            y: 0.5
        }, 1000, Phaser.Easing.Bounce.out, true, 0, -1, true);

        // 障碍2
        this.zhangai2 = game.add.sprite(2400, 0, 'zhangai2');
        game.physics.enable(this.zhangai2);
        this.zhangai2.scale.setTo(0.8);

        //障碍3
        zhangai3Group = game.add.group();
        initZhangai3();

        //障碍4
        this.zhangai4 = game.add.sprite(3000, 190, 'zhangai4');
        game.physics.enable(this.zhangai4);
        this.zhangai4.scale.setTo(0.6);
    }
    this.update = function () {
        
        if ( huya.y >= game.height) {
            this.gameOver();
        } 
        game.camera.follow(huya);
        if (count == 1) {
            huya.x += 1.6;
            if (huya.body.velocity.y < 0 && huya.body.velocity.y > -10) {
                huya.body.velocity.y = 200;
            }
            console.log(huya.body.gravity.y)
        }
        game.physics.arcade.collide(huya, layer, this.test);
        game.physics.arcade.overlap(huya, shuimu1, this.hitShuimu1, null, this);
        game.physics.arcade.overlap(huya, shuimu2, this.hitShuimu2, null, this);
        game.physics.arcade.overlap(huya, shuimu3, this.hitShuimu3, null, this);
        game.physics.arcade.overlap(huya, shuimu5, this.hitShuimu5, null, this);

        if (!hitShuimu4flag) {
            game.physics.arcade.overlap(huya, shuimu4, this.hitShuimu4, null, this);
        }
        game.physics.arcade.overlap(huya, jian, this.getjian, null, this);
        if (huya.x == 2150) {
            game.input.onDown.remove(this.fly, this);
        }
        if (count == 2) {
            huya.x += 0.4;
            if (huya.body.onFloor()) {
                huya.body.velocity.y = -300;
            }
        }
        if (huya.x - disX > 200) {
            huya.body.velocity.x = 0;
            huya.body.acceleration.x = 0;
            huya.body.gravity.y = 220;
            huya.body.acceleration.x = 0;
        }



    }
    this.gameOver = function () {
        game.state.start('stop');
    }
    this.test = function () {
        huya.body.gravity.y = 220;
        huya.body.velocity.y = 0;
    }
    this.fly = function () {
        console.log(huya.body.onFloor());
        if (huya.body.onFloor() || hitShuimuflag) {
            hitShuimuflag = false;
            console.log(123);
            huya.body.velocity.y = -220;
            huya.body.gravity.y = 220;
            // huyafly = game.add.tween(huya)
            // var height = huya.y;
            // huya.body.velocity.y = 10;
            // huyafly.to({
            //     y: height - 130
            // }, 550, Phaser.Easing.Linear.None, true, 0, 0, false);
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
        if (huya.body.onFloor() || hitShuimuflag) {
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
        if (huya.body.onFloor() || hitShuimuflag) {
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
    this.drop = function () {
        //huya.body.gravity.y = 500;
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
        // game.debug.body(huya);
        // game.debug.geom(new Phaser.Point(qipao.x, qipao.y), '#ffff00');

        //game.debug.geom(new Phaser.Point(this.temp.x, this.temp.y), '#ffff00');

    }
}
game.states.stop = function () {
    this.create = function () {
        huya.destroy();
        this.startButton = this.add.sprite(game.width / 2, game.height / 2, 'button');
        this.startButton.anchor.set(0.5);
        this.startButton.inputEnabled = true;
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputDown.add(this.startGame, this);
    }
    this.startGame = function () {
        this.startButton.destroy();
        game.state.start('start');
    }
}

// function state() {
//     this.init = function () {

//     }
//     this.preload = function () {
//         game.load.tilemap('bgmap', './assets/img/map3.json', null, Phaser.Tilemap.TILED_JSON);
//         game.load.image('mario', './assets/img/mytiled.png');
//         game.load.image('huya', './assets/img/huya.png');
//         game.load.image('shuimu1', './assets/img/shuimu1.png');
//         game.load.image('blueshuimu', './assets/img/blueshuimu2.png');
//         game.load.image('jian', './assets/img/jian.png');
//         game.load.image('qipao', './assets/img/qipao.png');
//         game.load.image('zhangai2', './assets/img/zhangai2.png');
//         game.load.image('zhangai3', './assets/img/zhangai3.png');
//         game.load.image('zhangai4', './assets/img/zhangai4.png');
//         game.load.atlasXML('huyasp', 'assets/img/sprites.png', 'assets/img/sprites.xml');

//     }
//     this.create = function () {
//         game.stage.setBackgroundColor(0x588DBE);
//         var map = game.add.tilemap('bgmap');
//         map.addTilesetImage('mytiled', 'mario');
//         layer = map.createLayer('map3_1');
//         layer.resizeWorld();

//         map.setCollisionBetween(95, 96);
//         map.setCollision(37);
//         game.physics.startSystem(Phaser.Physics.ARCADE);
//         // huya = game.add.sprite(20,250,'huyasp');
//         // huya.animations.add('run',[0,,2,3,4]);
//         // huya.animations.add('jump',[5,7,6,8,9]);
//         // huya.play('run',10,true);


//         huya = game.add.sprite(40, 250, 'huya');


//         game.physics.enable(huya);
//         huya.body.gravity.y = 220;
//         huya.anchor.set(0.5);
//         console.log(huya.width)
//         huya.body.setCircle(huya.width / 2.5, 10, 2);
//         //弹跳不起作用？？？
//         huya.body.bounce.y = 0.5;

//         game.input.onDown.add(this.fly, this);

//         //水母
//         shuimu1 = game.add.sprite(886, 120, 'shuimu1');
//         game.physics.enable(shuimu1);
//         shuimu1.body.setSize(10, 10, 10, 0);
//         console.log(shuimu1.body.width);
//         game.physics.enable(shuimu1);

//         shuimu2 = game.add.sprite(1450, 220, 'shuimu1');
//         game.physics.enable(shuimu2);
//         shuimu2.body.setSize(1, 10, shuimu2.width / 2, 0);
//         console.log(shuimu2.body.width);
//         game.physics.enable(shuimu2);

//         shuimu3 = game.add.sprite(1570, 210, 'shuimu1');
//         game.physics.enable(shuimu3);
//         shuimu3.body.setSize(1, 10, shuimu3.width / 2, 0);
//         console.log(shuimu3.body.width);
//         game.physics.enable(shuimu3);

//         //跳跳水母
//         shuimu4 = game.add.sprite(2000, 250, 'blueshuimu');
//         game.physics.enable(shuimu4);
//         shuimu4.body.setSize(1, 10, shuimu4.width / 2, 0);
//         game.physics.enable(shuimu4);

//         shuimu5 = game.add.sprite(1680, 220, 'blueshuimu');
//         game.physics.enable(shuimu5);
//         shuimu5.body.setSize(1, 10, shuimu5.width / 2, 0);
//         game.physics.enable(shuimu5);

//         //剑
//         jian = game.add.sprite(2300, 230, 'jian');
//         game.physics.enable(jian);
//         jian.scale.setTo(0.55);
//         this.jiantween = game.add.tween(jian.scale)
//         this.jiantween.to({
//             x: 0.5,
//             y: 0.5
//         }, 1000, Phaser.Easing.Bounce.out, true, 0, -1, true);

//         // 障碍2
//         this.zhangai2 = game.add.sprite(2400, 0, 'zhangai2');
//         game.physics.enable(this.zhangai2);
//         this.zhangai2.scale.setTo(0.8);

//         //障碍3
//         zhangai3Group = game.add.group();
//         initZhangai3();

//         //障碍4
//         this.zhangai4 = game.add.sprite(3000, 190, 'zhangai4');
//         game.physics.enable(this.zhangai4);
//         this.zhangai4.scale.setTo(0.6);
//     }
//     this.update = function () {
//         game.camera.follow(huya);
//         if (count == 1) {
//             huya.x += 1.6;

//             if (huya.body.velocity.y < 0 && huya.body.velocity.y > -10) {
//                 huya.body.velocity.y = 200;
//             }
//             console.log(huya.body.gravity.y)
//         }
//         game.physics.arcade.collide(huya, layer, this.test);
//         game.physics.arcade.overlap(huya, shuimu1, this.hitShuimu1, null, this);
//         game.physics.arcade.overlap(huya, shuimu2, this.hitShuimu2, null, this);
//         game.physics.arcade.overlap(huya, shuimu3, this.hitShuimu3, null, this);
//         game.physics.arcade.overlap(huya, shuimu5, this.hitShuimu5, null, this);

//         if (!hitShuimu4flag) {
//             game.physics.arcade.overlap(huya, shuimu4, this.hitShuimu4, null, this);
//         }
//         game.physics.arcade.overlap(huya, jian, this.getjian, null, this);
//         if (huya.x == 2150) {
//             game.input.onDown.remove(this.fly, this);
//         }
//         if (count == 2) {
//             huya.x += 0.4;
//             if (huya.body.onFloor()) {
//                 huya.body.velocity.y = -300;
//             }
//         }
//         if (huya.x - disX > 200) {
//             huya.body.velocity.x = 0;
//             huya.body.acceleration.x = 0;
//             huya.body.gravity.y = 220;
//             huya.body.acceleration.x = 0;
//         }



//     }
//     this.test = function () {
//         huya.body.gravity.y = 220;
//         huya.body.velocity.y = 0;
//     }
//     this.fly = function () {
//         console.log(huya.body.onFloor());
//         if (huya.body.onFloor() || hitShuimuflag) {
//             hitShuimuflag = false;
//             console.log(123);
//             huya.body.velocity.y = -220;
//             huya.body.gravity.y = 220;
//             // huyafly = game.add.tween(huya)
//             // var height = huya.y;
//             // huya.body.velocity.y = 10;
//             // huyafly.to({
//             //     y: height - 130
//             // }, 550, Phaser.Easing.Linear.None, true, 0, 0, false);
//         }
//     }
//     this.hitShuimu1 = function () {
//         shuimu1fly = game.add.tween(shuimu1)
//         huya.body.gravity.y = 120;
//         shuimu1fly.to({
//             y: huya.y + 26,
//             x: huya.x - 12,
//         }, 10, Phaser.Easing.Linear.None, true, 0, 0, false);
//         hitShuimuflag = true;
//     }
//     this.hitShuimu2 = function () {
//         shuimu2fly = game.add.tween(shuimu2)
//         huya.body.gravity.y = 120;
//         shuimu2fly.to({
//             y: huya.y + 26,
//             x: huya.x - 12,
//         }, 10, Phaser.Easing.Linear.None, true, 0, 0, false);
//         hitShuimuflag = true;
//     }
//     this.hitShuimu3 = function () {
//         shuimu3fly = game.add.tween(shuimu3)
//         huya.body.gravity.y = 120;
//         shuimu3fly.to({
//             y: huya.y + 26,
//             x: huya.x - 12,
//         }, 10, Phaser.Easing.Linear.None, true, 0, 0, false);
//         hitShuimuflag = true;
//     }
//     this.hitShuimu4 = function () {
//         hitShuimu4flag = true;
//         hitShuimuflag = true;
//         game.add.tween(shuimu4).to({
//             y: shuimu4.y + 26,

//         }, 100, Phaser.Easing.Bounce.out, true, 0, 1, true);
//         if (huya.body.onFloor() || hitShuimuflag) {
//             hitShuimuflag = false;
//             huyafly = game.add.tween(huya)
//             huya.body.velocity.y = -200;
//             huya.body.gravity.y = 300;
//         }
//     }
//     this.hitShuimu5 = function () {
//         hitShuimuflag = true;
//         game.add.tween(shuimu5).to({
//             y: shuimu4.y + 26,

//         }, 100, Phaser.Easing.Bounce.out, true, 0, 1, true);
//         if (huya.body.onFloor() || hitShuimuflag) {
//             hitShuimuflag = false;
//             huyafly = game.add.tween(huya)
//             huya.body.velocity.y = -200;
//             huya.body.gravity.y = 300;
//         }
//     }
//     this.getjian = function () {
//         count += 1;
//         jian.destroy();
//         moveZhangai3();
//         game.time.events.loop(2400, moveZhangai3, this);
//         game.input.onDown.remove(this.fly, this);
//         game.input.onDown.add(this.move, this);

//     }
//     this.drop = function () {
//         //huya.body.gravity.y = 500;
//     }
//     this.move = function () {
//         disX = huya.x;
//         huya.body.velocity.x = 200;
//         huya.body.acceleration.x = 1000;
//         huya.body.velocity.y = 0;
//         huya.body.gravity.y = 0;
//     }
//     this.render = function () {
//         // if (this.temp) {
//         //     game.debug.body(this.temp);
//         //     game.debug.geom(new Phaser.Point(this.temp.x, this.temp.y), '#ffff00');
//         // }
//         // game.debug.body(shuimu1);
//         // game.debug.body(huya);
//         // game.debug.geom(new Phaser.Point(qipao.x, qipao.y), '#ffff00');

//         //game.debug.geom(new Phaser.Point(this.temp.x, this.temp.y), '#ffff00');

//     }
// }

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
//移动障碍3
function moveZhangai3() {
    var zhangaiChild = zhangai3Group.getFirstDead();
    if (zhangaiChild != null) {
        zhangaiChild.reset(2740, game.height);
        zhangaiChild.body.velocity.y = -100;
    }
}

game.state.add('menu', game.states.menu);
game.state.add('start', game.states.start);
game.state.add('stop', game.states.stop);
game.state.start('menu');
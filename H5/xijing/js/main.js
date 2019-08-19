
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

game.states = {};
console.log(window.innerWidth);
console.log(game.width);
game.states.boot = function () {
    this.preload = function () {
            game.load.image('loading','./img/loading.gif')
        },
        this.create = function () {
            this.state.start('menu');
        }
}

game.states.menu = function () {
    var progressText;
    this.init = function () {
        game.stage.backgroundColor = "0Xffffff";
        progressText = game.add.text(game.world.centerX, game.world.centerY - 50, '0%', {
            fill: '#fff',
            fontSize: '16px'
        });
        progressText.anchor = {
            x: 0.5,
            y: 0.5
        };
        this.loading = game.add.image(game.world.centerX, game.world.centerY,'loading');
        this.loading.anchor = {
            x: 0.5,
            y: 0.5
        };
    }
    //JSON.stringify(map3Img)
    this.preload = function () {
        game.load.image('btn','./img/btn.jpg');
        game.load.video('recruit', './img/recruit.mp4');
        game.load.onFileComplete.add(function (progress) {
            progressText.text = progress + '%';
        })
    }
    this.create = function () {
        this.loading.destroy();
        this.startButton = this.add.sprite(game.world.centerX, game.world.centerY, 'btn');
        this.startButton.anchor.set(0.5);
        this.startButton.scale.setTo(0.5);
        this.startButton.inputEnabled = true;
        game.add.tween(this.startButton).to( { alpha:0.3}, 1000, Phaser.Easing.Bounce.out, true,0,-1,true);
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputDown.add(this.startGame, this);
    }
    this.startGame = function () {
        this.startButton.destroy();
        this.video = game.add.video('recruit');        
        this.video.play(true);
        console.log(this.video.width);
        console.log(this.video.height);
        this.video.addToWorld(0,0,0,0,game.width/this.video.width,game.height/this.video.height);
        //this.video.scale.setTo(videoScale);
    }
}

game.state.add('boot', game.states.boot);
game.state.add('menu', game.states.menu);
game.state.start('boot');




























function preload() {



}

// function create() {

//     // game.add.image(0, 0, 'star');

//     // var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'dragon');
//     // sprite.anchor.set(0.5);

//     game.stage.backgroundColor = '#000000';

//     // Stretch to fill
//     game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

//     // Keep original size
//     // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

//     // Maintain aspect ratio
//     // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

//     game.input.onDown.add(gofull, this);

// }

// function gofull() {

//     if (game.scale.isFullScreen) {
//         game.scale.stopFullScreen();
//     } else {
//         game.scale.startFullScreen(false);
//     }

// }

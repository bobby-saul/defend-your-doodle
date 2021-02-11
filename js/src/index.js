import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Game from "./scenes/Game";
import Draw from "./scenes/Draw";

var config = {
    type: Phaser.CANVAS,
    // type: Phaser.AUTO, // CANVAS works smoother on my old mac
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Preload, Draw, Game]
};

var game = new Phaser.Game(config);

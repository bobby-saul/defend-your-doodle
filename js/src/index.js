import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Start from "./scenes/Start";
import Draw from "./scenes/Draw";
import Day from "./scenes/Day";
import Night from "./scenes/Night";
import GameOver from "./scenes/GameOver";

var config = {
    type: Phaser.CANVAS,
    // type: Phaser.AUTO, // CANVAS works smoother on my old mac
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Preload, Start, Draw, Day, Night, GameOver]
};

var game = new Phaser.Game(config);

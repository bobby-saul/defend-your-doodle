import Phaser from 'phaser';
import Button from '../objects/Button';

class GameOver extends Phaser.Scene {
	constructor() {
		super('gameover');
	}

    init(data) {
        this.day = data.day;
    }

	preload() {
        this.pointer = this.input.activePointer;
        this.cameras.main.setBackgroundColor('#FFFFFF');
	}

	create() {
        // Background
        this.sidePanel = this.add.graphics();
        this.sidePanel.fillStyle(0xeeeeee, 1);
        this.sidePanel.fillRect(100, 100, 600, 400);

        // Title
        this.instructionText = this.add.text(325, 150, "Game Over", {
            fontSize: '24px',
            fill: 0x0000ff,
            align: "center"
        });

        // Instructions
        this.instructionText = this.add.text(150, 200, `You lasted ${this.day} days... You can do better! Play again.`, {
            fontSize: '16px',
            fill: 0x0000ff,
            wordWrap: {
                width: 500
            }
        });

        // Play Game button
        this.playButton = new Button(this, 350, 400, {
            text: "New Game",
            bgColor: 0xff0000,
        });
        this.playButton.on("pointerdown", this.playGame, this);
	}
    playGame() {
        this.scene.start('draw');
        this.scene.stop();   
    }
}

export default GameOver;

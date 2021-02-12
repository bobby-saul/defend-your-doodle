import Phaser from 'phaser';
import Button from '../objects/Button';

const instructions = "Start off by drawing your doodle. Then, spend the days collecting items to help you survive the nightly raid by doodle monsters. See how many days you can survive!";

class Start extends Phaser.Scene {
	constructor() {
		super('start');
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
        this.instructionText = this.add.text(250, 150, "Defend Your Doodle", {
            fontSize: '24px',
            fill: 0x0000ff,
            align: "center"
        });

        // Instructions
        this.instructionText = this.add.text(150, 200, instructions, {
            fontSize: '16px',
            fill: 0x0000ff,
            wordWrap: {
                width: 500
            }
        });

        // Play Game button
        this.playButton = new Button(this, 350, 400, {
            text: "Start Game",
            bgColor: 0xff0000,
        });
        this.playButton.on("pointerdown", this.playGame, this);
	}
    playGame() {
        this.scene.start('draw');
        this.scene.stop();   
    }
}

export default Start;

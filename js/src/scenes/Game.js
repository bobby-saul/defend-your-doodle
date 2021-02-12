import Phaser from 'phaser';

const baseSpeed = 160;
const diagonalSpeed = Math.sqrt(Math.pow(baseSpeed, 2) / 2);

class Game extends Phaser.Scene {
	constructor() {
		super('game');
	}

    init(data) {
        this.lineWidth = data.lineWidth;
    }

	preload() {
		this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor('#FFFFFF');
	}

	create() {
        this.character = this.physics.add.sprite(150, 150, "character");
        this.character.scale = 1 / this.lineWidth;
	}

	update() {
        if (this.cursors.left.isDown) {
            if (this.cursors.up.isDown) {
                this.character.setVelocity(-diagonalSpeed, -diagonalSpeed);
            } else if (this.cursors.down.isDown) {
                this.character.setVelocity(-diagonalSpeed, diagonalSpeed);
            } else {
                this.character.setVelocity(-baseSpeed, 0);
            }
        } else if (this.cursors.right.isDown) {
            if (this.cursors.up.isDown) {
                this.character.setVelocity(diagonalSpeed, -diagonalSpeed);
            } else if (this.cursors.down.isDown) {
                this.character.setVelocity(diagonalSpeed, diagonalSpeed);
            } else {
                this.character.setVelocity(baseSpeed, 0);
            }
        } else if (this.cursors.up.isDown) {
            this.character.setVelocity(0, -baseSpeed);
        } else if (this.cursors.down.isDown) {
            this.character.setVelocity(0, baseSpeed);
        } else {
            this.character.setVelocity(0, 0);
        }
    }
}

export default Game;

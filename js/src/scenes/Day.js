import Phaser from 'phaser';

const baseSpeed = 160;
const diagonalSpeed = Math.sqrt(Math.pow(baseSpeed, 2) / 2);

class Day extends Phaser.Scene {
	constructor() {
		super('day');
	}

    init(data) {
        this.lineWidth = data.lineWidth;
        this.health = data.health;
        this.items = data.items;
        this.day = data.day;
        this.timeLimit = data.timeLimit;
        this.key = data.key;
    }

	preload() {
		this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor('#FFFFFF');
	}

	create() {
        console.log('Starting Day ' + this.day);
        // Character
        this.character = this.physics.add.sprite(100, 400, this.key);
        this.character.scale = 1 / this.lineWidth;
        // Wall
        this.wall = this.physics.add.sprite(100, 500, 'wall');
        // Timer
        this.timer = this.time.delayedCall(this.timeLimit, this.startNight, [], this);
        var timeLeft = Math.floor(this.timeLimit / 1000);
        this.timerText = this.add.text(400, 25, timeLeft + " seconds left of day " + this.day, {
            fontSize: '16px',
            fill: '#000',
        });
        this.timerText.x = 400 - (this.timerText.width / 2);
	}

    startNight() {
        this.scene.start('night', {
            lineWidth: this.lineWidth,
            health: this.health,
            items: this.items,
            day: this.day,
            timeLimit: this.timeLimit,
            key: this.key,
		});
		this.scene.stop();
    }

    endGame() {
        this.scene.start('gameover', {
            day: this.day
		});
		this.scene.stop();
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
        // Timer
        var timeLeft = Math.floor(this.timeLimit / 1000) - Math.floor(this.timer.getProgress() * this.timeLimit / 1000);
        this.timerText.setText(timeLeft + " seconds left of day " + this.day);
    }
}

export default Day;

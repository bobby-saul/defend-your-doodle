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
        // Wall
        this.wall = this.physics.add.sprite(100, 500, 'wall');
        // Character
        this.character = this.physics.add.sprite(100, 400, this.key);
        this.character.scale = 1 / this.lineWidth;
        this.character.setCollideWorldBounds(true);
        // Items box
        this.itemBox = this.add.graphics();
        this.itemBox.fillStyle(0xeeeeee, 1);
        this.itemBox.fillRect(710, 535, 90, 65);
        // bullets
        this.bulletCount = this.add.text(700, 550, this.items.bullets, {
            fontSize: '16px',
            fill: '#000',
        });
        this.bulletCount.x = 750 - this.bulletCount.width
        this.bulletIcon = this.add.image(770, 560, 'bullets');
        this.bulletIcon.scale = 0.15;
        // Matterials
        this.materialsCount = this.add.text(700, 575, this.items.materials, {
            fontSize: '16px',
            fill: '#000',
        });
        this.materialsCount.x = 750 - this.materialsCount.width
        this.materialsIcon = this.add.image(770, 585, 'wood');
        this.materialsIcon.scale = 0.15;
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

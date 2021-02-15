import Phaser from 'phaser';


class Night extends Phaser.Scene {
	constructor() {
		super('night');
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
        this.cameras.main.setBackgroundColor('#777777');
	}

	create() {
        console.log('Starting Night ' + this.day);
        // Wall
        this.wall = this.physics.add.sprite(100, 500, 'wall');
        // Character
        this.character = this.physics.add.sprite(100, 500, this.key);
        this.character.scale = 1 / this.lineWidth;
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
        this.timer = this.time.delayedCall(this.timeLimit, this.startDay, [], this);
        var timeLeft = Math.floor(this.timeLimit / 1000);
        this.timerText = this.add.text(400, 25, timeLeft + " seconds left of night " + this.day, {
            fontSize: '16px',
            fill: '#000',
        });
        this.timerText.x = 400 - (this.timerText.width / 2);

        if (this.day > 3) {
            this.endGame();
        }
	}

    startDay() {
        this.scene.start('day', {
            lineWidth: this.lineWidth,
            health: this.health,
            items: this.items,
            day: this.day + 1,
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
        // Timer
        var timeLeft = Math.floor(this.timeLimit / 1000) - Math.floor(this.timer.getProgress() * this.timeLimit / 1000);
        this.timerText.setText(timeLeft + " seconds left of night " + this.day);
    }
}

export default Night;

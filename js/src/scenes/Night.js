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
        this.character = this.physics.add.sprite(150, 150, this.key);
        this.character.scale = 1 / this.lineWidth;
        this.timer = this.time.delayedCall(this.timeLimit, this.startDay, [], this);

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
    }
}

export default Night;

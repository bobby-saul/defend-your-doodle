import Phaser from 'phaser';

class Preload extends Phaser.Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.image('stick-man', './assets/stick-man.png');
		this.load.image('monster-1', './assets/monster-1.png');
		this.load.image('wall', './assets/wall.png');
		this.load.image('bullets', './assets/bullets.png');
		this.load.image('wood', './assets/wood.png');
	}

	create() {
		this.scene.start('start');
	}
}

export default Preload;
import Phaser from 'phaser';

class Preload extends Phaser.Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.image('stick-man', './assets/stick-man.png');
	}

	create() {
		this.scene.start('draw');
	}
}

export default Preload;
import Phaser from 'phaser';

const closestDistance = 8;
const lineWidth = 10;

class Draw extends Phaser.Scene {
	constructor() {
		super('draw');
	}

	preload() {
        this.pointer = this.input.activePointer;
        this.cameras.main.setBackgroundColor('#FFFFFF');
	}

	create() {
        // Draw
        this.graphics = this.add.graphics();
        this.lineGoing = false;
        this.lines = [];
        this.points = [];
        this.line = new Phaser.Curves.Spline([]);
        this.currentPoint = new Phaser.Math.Vector2(-100, -100);
        // Go to game scene
        this.input.keyboard.on('keydown-ENTER', this.playGame, this);
	}

    playGame() {
        this.graphics.generateTexture('character');
        this.scene.start('game');
        this.scene.stop();   
    }

	update() {
        if (this.pointer.isDown) {
            this.lineGoing = true;
            var x = this.pointer.worldX;
            var y = this.pointer.worldY;
            if (Phaser.Math.Distance.Between(this.currentPoint.x, this.currentPoint.y, x, y) > closestDistance) {
                this.currentPoint = new Phaser.Math.Vector2(x, y);
                this.line.addPoint(x, y);
            }
        } else if (this.lineGoing) {
            this.lineGoing = false;
            if (this.line.points.length > 1) {
                this.lines.push(this.line);
            } else {
                this.points.push(this.currentPoint);
            }
            this.line = new Phaser.Curves.Spline([]);
            this.currentPoint = new Phaser.Math.Vector2(-100, -100);
        }
        // Reset graphics
        this.graphics.clear();
        this.graphics.lineStyle(lineWidth, 0x000000);
        this.graphics.fillStyle(0x000000, 1);
        // Draw current line
        if (this.line.points.length > 0) {
            this.line.draw(this.graphics, this.line.points.length * 2);
        }
        // Draw points
        for (var i = 0; i < this.points.length; i++){
            var p = this.points[i];
            this.graphics.fillCircle(p.x, p.y, lineWidth);
        }
        // Draw lines
        for (var i = 0; i < this.lines.length; i++){
            this.lines[i].draw(this.graphics, this.lines[i].points.length * 2);
        }
    }
}

export default Draw;

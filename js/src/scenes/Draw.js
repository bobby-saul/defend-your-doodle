import Phaser from 'phaser';
import Button from '../objects/Button';

const closestDistance = 8;
const lineWidth = 10;
const instructions = "Click and draw your player on the left. When you are satisfied with your creation, click start game to begin.";
const timeLimit = 3000;

class Draw extends Phaser.Scene {
	constructor() {
		super('draw');
	}

	preload() {
        this.pointer = this.input.activePointer;
        this.cameras.main.setBackgroundColor('#FFFFFF');
	}

	create() {
        // Initially have this off so dot is not accidentally added when clicking start.
        this.canDraw = false;
        this.time.delayedCall(300, this.allDraw, [], this);

        // Sidebar
        this.sidePanel = this.add.graphics();
        this.sidePanel.fillStyle(0xeeeeee, 1);
        this.sidePanel.fillRect(550, 0, 250, 600);

        // Title
        this.instructionText = this.add.text(575, 50, "Scribble Jam", {
            fontSize: '24px',
            fill: 0x0000ff,
            align: "center"
        });

        // Instructions
        this.instructionText = this.add.text(575, 100, instructions, {
            fontSize: '16px',
            fill: 0x0000ff,
            wordWrap: {
                width: 200
            }
        });

        // Play Game button
        this.playButton = new Button(this, 600, 275, {
            text: "Start Game",
            bgColor: 0xff0000,
        });
        this.playButton.on("pointerdown", this.playGame, this);

        // Undo button
        this.undoButton = new Button(this, 600, 550, {
            text: "Undo",
            bgColor: 0xff0000,
        });
        this.undoButton.on("pointerdown", this.undo, this);

        // Drawing guide image with low alpha
        this.stickManGuide = this.add.image(275, 300, 'stick-man');
        this.stickManGuide.alpha = 0.25;
        this.stickManGuide.scale = 2.5;

        // Draw
        this.graphics = this.add.graphics();
        this.lineGoing = false;
        this.lines = [];
        this.line = new Phaser.Curves.Spline([]);
        this.currentPoint = new Phaser.Math.Vector2(-100, -100);
	}

    allDraw() {
        this.canDraw = true;
    }

    undo() {
        this.lines.pop();
    }

    playGame() {
        const key = 'character-' + Date.now();
        this.graphics.generateTexture(key, 575);
        this.scene.start('day', {
            lineWidth: lineWidth,
            health: 100,
            items: {},
            day: 1,
            timeLimit: timeLimit,
            key: key
        });
        this.scene.stop();   
    }

	update() {
        if (this.canDraw) {
            if (this.pointer.isDown && this.pointer.worldX < 550) {
                this.lineGoing = true;
                var x = this.pointer.worldX;
                var y = this.pointer.worldY;
                if (Phaser.Math.Distance.Between(this.currentPoint.x, this.currentPoint.y, x, y) > closestDistance) {
                    this.currentPoint = new Phaser.Math.Vector2(x, y);
                    this.line.addPoint(x, y);
                }
            } else if (this.lineGoing) {
                this.lineGoing = false;
                this.lines.push(this.line);
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
            // Draw old lines
            for (var i = 0; i < this.lines.length; i++){
                if (this.lines[i].points.length > 1) {
                    this.lines[i].draw(this.graphics, this.lines[i].points.length * 2);
                } else  if (this.lines[i].points.length > 0) {
                    this.graphics.fillCircle(this.lines[i].points[0].x, this.lines[i].points[0].y, lineWidth / 2);
                }
            }   
        }
    }
}

export default Draw;

import Phaser from 'phaser';

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, config) {
        super(scene, x, y, 32, 32, 0x000000);
        scene.add.existing(this);
        this.text = config.text ? config.text : "";
        this.width = config.width ? config.width : 32;
        this.height = config.height ? config.height : 32;
        this.bgColor = config.bgColor ? config.bgColor : 0x000000;
        this.hoverColor = config.hoverColor ? config.hoverColor : 0x333333;
        this.borderWidth = config.borderWidth  ? config.borderWidth : 1;
        this.borderColor = config.borderColor ? config.borderColor : 0x000000;
        this.textColor = config.textColor ? config.textColor : '#ffffff';
        this.fontHeight = config.fontHeight ? config.fontHeight : '16px';
        this.verticalPadding = config.verticalPadding ? config.verticalPadding : 12;
        this.horizontalPadding = config.horizontalPadding ? config.horizontalPadding : 12;
        this.fillColor = this.bgColor;
        this.setStrokeStyle(this.borderWidth, this.borderColor);

        // Add text
        if (this.text) {
            this.buttonText = scene.add.text(x - (this.borderWidth * 2), y - (this.borderWidth * 2), this.text, {
                fontSize: this.fontHeight,
                fill: this.textColor,
                align: 'center'
            });
            this.width = this.buttonText.width + (this.horizontalPadding * 2);
            this.height = this.buttonText.height + (this.verticalPadding * 2);
        }

        // Events
        this.setInteractive();
        this.on('pointerover', this.hover, this);
        this.on('pointerout',this.unhover, this);
    }

    hover() {
        this.fillColor = this.hoverColor;
    }

    unhover() {
        this.fillColor = this.bgColor;
    }
}

export default Button;
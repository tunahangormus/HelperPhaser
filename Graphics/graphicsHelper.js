class GraphicsHelper {
	constructor(graphics) {
		this.allGraphics = []
		this.graphics = graphics;
		this.allGraphics.push(this.graphics);
	}
	
	// use this before doing anything involving lines/strokes
	lineStyle(lineWidth, color, alpha) {
		this.lineWidth = lineWidth;
		this.lineColor = color;
		this.lineAlpha = (alpha == undefined) ? 1 : alpha;
	}
	
	// use this before doing anything involving fills
	fillStyle(color, alpha) {
		this.fillColor = color;
		this.fillAlpha = (alpha == undefined) ? 1 : alpha;
	}
	
	// draws a stroke rounded rectangle (needed, because phaser's own strokeRoundedRect is unstable due to a bug in the arc function)
	strokeRoundedRect(leftX, topY, width, height, radius) {
		if (this.graphics.arcTopRight == undefined) {
			this.graphics.arcTopRight = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcTopRight);
		}
		if (this.graphics.arcBottomRight == undefined) {
			this.graphics.arcBottomRight = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcBottomRight);
		}
		if (this.graphics.arcBottomLeft == undefined) {
			this.graphics.arcBottomLeft = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcBottomLeft);
		}
		if (this.graphics.arcTopLeft == undefined) {
			this.graphics.arcTopLeft = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcTopLeft);
		}
		
		this.graphics.beginPath();
		
		// top line
		this.graphics.moveTo(leftX + radius, topY);
		this.graphics.lineTo(leftX + width - radius, topY);
		// top right corner
		this.drawArc(this.graphics.arcTopRight, leftX + width - radius, topY + radius, radius, 1.5*Math.PI, 0);
		// right line
		this.graphics.moveTo(leftX + width, topY + radius);
		this.graphics.lineTo(leftX + width, topY + height - radius);
		// bottom right corner
		this.drawArc(this.graphics.arcBottomRight, leftX + width - radius, topY + height - radius, radius, 0, 0.5*Math.PI);
		// bottom line
		this.graphics.moveTo(leftX + width - radius, topY + height);
		this.graphics.lineTo(leftX + radius, topY + height);
		// bottom left corner
		this.drawArc(this.graphics.arcBottomLeft, leftX + radius, topY + height - radius, radius, 0.5*Math.PI, Math.PI);
		// left line
		this.graphics.moveTo(leftX, topY + height - radius);
		this.graphics.lineTo(leftX, topY + radius);
		// top left corner
		this.drawArc(this.graphics.arcTopLeft, leftX + radius, topY + radius, radius, Math.PI, 1.5*Math.PI);
		
		this.graphics.closePath();
		this.graphics.strokePath();
		
	}
	
	// draws an arc (needed, because phaser's own arc is buggy)
	drawArc(graphics, centerX, centerY, radius, startAngle, endAngle) {
		graphics.clear();
		graphics.lineStyle(this.lineWidth, this.lineColor, this.lineAlpha);
		graphics.beginPath();
		graphics.arc(0, 0, radius, startAngle, endAngle);
		graphics.strokePath();
		graphics.setPosition(centerX, centerY);
	}
	
	// draw box with borders
	drawBox(leftX, topY, width, height, radius) {
		this.graphics.clear();
		this.graphics.fillStyle(this.fillColor, this.fillAlpha);
		this.graphics.fillRoundedRect(leftX, topY, width, height, radius);
		this.graphics.lineStyle(this.lineWidth, this.lineColor, this.lineAlpha);
		this.strokeRoundedRect(leftX, topY, width, height, radius);
	}
	
	// draw box without borders
	drawBorderlessBox(leftX, topY, width, height, radius) {
		this.graphics.clear();
		this.graphics.fillStyle(this.fillColor, this.fillAlpha);
		this.graphics.fillRoundedRect(leftX, topY, width, height, radius);
	}
	
	// correctly change the box's alpha
	setAlpha(alpha) {
		for (let i=0; i<this.allGraphics.length; i++) {
			this.allGraphics[i].alpha = alpha;
		}
	}
	
	// correctly add box to a container
	addToContainer(container) {
		for (let i=0; i<this.allGraphics.length; i++) {
			container.add(this.allGraphics[i]);
		}
	}
}

export default GraphicsHelper;

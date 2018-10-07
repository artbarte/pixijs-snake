class Rectangle extends PIXI.Graphics {
    constructor(w, h, color = 0xf82929) {
        super();
        this.w = w;
        this.h = h;

        this.beginFill(color);
        this.drawRect(0, 0, this.w, this.h);
        this.endFill();
    }
}

export default class Snake extends PIXI.Container {
    constructor(size) {
        super();
        this.size = size;
        this.vx = 0;
        this.vy = 0;
        this.body = [];
        this.grow();
    }

    grow() {
        const cell = new Rectangle(this.size, this.size);
        this.body.addChild(cell);
    }

    move() {
        for (let i = 0; i < this.body.children.length; i++) {
            this.body.children[i].x += this.vx * this.size;
            this.body.children[i].y += this.vy * this.size;
        }
    }
}

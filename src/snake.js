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

export class Snake extends PIXI.Container {
    constructor(size) {
        super();
        this.size = size;
        this.vx = 0;
        this.vy = 0;
        this.body = this.children;
        this.head = new PIXI.Point(0, 0);

        this.grow();
    }

    grow() {
        const cell = new Rectangle(this.size, this.size);
        this.addChild(cell);
    }

    move() {
        for (let i = 0; i > this.body.length - 1; i++) {
            this.setChildIndex(this.getChildAt(i), i + 1);
        }

        this.head.x += this.vx * this.size;
        this.head.y += this.vy * this.size;

        const lastElem = this.body[this.body.length - 1];
        lastElem.position = this.head;
        this.addChildAt(lastElem, 0);
    }
}


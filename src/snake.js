function mod(a, n) {
    return a - (n * Math.floor(a / n));
}


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
export class Food extends Rectangle {
    constructor(size, boardH, boardW) {
        super(size, size, 0x4286f4);
        this.size = size;
        this.boardW = boardW;
        this.boardH = boardH;
        this.generateNew();
    }

    generateNew() {
        this.x = (Math.floor(Math.random() * this.boardW / this.size)) * this.size;
        this.y = (Math.floor(Math.random() * this.boardH / this.size)) * this.size;
    }
}
export class Snake extends PIXI.Container {
    constructor(size, boardH, boardW) {
        super();
        this.size = size;
        this.boardW = boardW;
        this.boardH = boardH;
        this.vx = 0;
        this.vy = 0;
        this.body = this.children;
        this.head = new PIXI.Point(0, 0);

        this.directions = {
            NORTH: [0, -1],
            EAST: [1, 0],
            SOUTH: [0, 1],
            WEST: [-1, 0],
            STOP: [0, 0],
        };
        this.currDirection = this.directions.STOP;
        this.grow();
    }

    grow() {
        const cell = new Rectangle(this.size, this.size);
        const added = this.addChild(cell);

        if (this.body.length > 1) {
            added.position.x = this.body[this.body.length - 2].x;
            added.position.y = this.body[this.body.length - 2].y;
        }
    }

    move() {
        // Calculate next head position
        this.head.x += this.currDirection[0] * this.size;
        this.head.y += this.currDirection[1] * this.size;

        // Complicated way using modulo (because JS % buggy(???) to dectect with snake went out of board)
        this.head.x = mod((this.body[0].getGlobalPosition().x), this.boardW) - this.body[0].getGlobalPosition().x + this.head.x;
        this.head.y = mod((this.body[0].getGlobalPosition().y), this.boardH) - this.body[0].getGlobalPosition().y + this.head.y;

        // Check if next head is not colliding with any other parts
        for (let i = 0; i < this.body.length - 1; i++) {
            if (i === 0) continue;
            if (this.head.x == this.body[i].x && this.head.y == this.body[i].y) {
                this.removeChildren(1);
                this.head.x = 0;
                this.head.y = 0;
            }
        }

        const lastBodyPart = this.body[this.body.length - 1];
        lastBodyPart.position = this.head;
        this.addChildAt(lastBodyPart, 0);
    }
}

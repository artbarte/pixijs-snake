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
    constructor(size,boardH, boardW) {
        super(size,size);
        this.size = size
        this.boardW = boardW
        this.boardH = boardH
        this.generateNew()
    }
    generateNew() {
        this.x = (Math.floor(Math.random() * this.boardW / this.size)) * this.size
        this.y = (Math.floor(Math.random() * this.boardH / this.size)) * this.size
    }
}
export class Snake extends PIXI.Container {
    constructor(size,boardH,boardW) {
        super();
        this.size = size;
        this.boardW = boardW
        this.boardH = boardH
        this.vx = 0;
        this.vy = 0;
        this.body = this.children;
        this.head = new PIXI.Point(0, 0);

        this.grow();
    }

    grow() {
        const cell = new Rectangle(this.size, this.size);
        const added = this.addChild(cell);
        
        if (this.body.length > 1) {
            added.position.x = this.body[this.body.length -2].x
            added.position.y = this.body[this.body.length -2].y
            console.log(added.position)
        }
        
        
        
    }

    move() {
    //     this.head.x += (this.vx * this.size % this.boardW)* this.size;
    //     this.head.y += (this.vy * this.size % this.boardH)* this.size;
        this.head.x += this.vx * this.size;
        this.head.y += this.vy * this.size;
        
        for (let i = 0;i < this.body.length - 1;i++) {
            console.log(this.head.x == this.body[i].x && this.head.y == this.body[i].y)
            if (i === 0) continue
            if (this.head.x == this.body[i].x && this.head.y == this.body[i].y){
                
                
                this.removeChildren(1)
                this.head.x = 0
                this.head.y = 0
            }
        }

        for (let i = 0; i > this.body.length - 1; i++) {
            this.setChildIndex(this.getChildAt(i), i + 1);
        }

        const lastElem = this.body[this.body.length - 1];
        lastElem.position = this.head;
        this.addChildAt(lastElem, 0);
    }
}

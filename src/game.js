import * as PIXI from 'pixi.js';
import {Snake} from './snake';

const {
    Application, // loader, resources, Sprite,
} = PIXI;

const app = new Application({
    width: 400,
    height: 400,
    antialias: true,
    transparent: false,
    resolution: 1,
});

document.body.appendChild(app.view);

// loader.add("img/tetris.png").load(setup);

const gridCell = 20;

const snake = new Snake(gridCell);


function setup() {
    window.addEventListener('keydown', (e) => {
        switch (e.key.toUpperCase()) {
        case 'W': snake.vx = 0; snake.vy = -1; break;
        case 'A': snake.vx = -1; snake.vy = 0; break;
        case 'S': snake.vx = 0; snake.vy = 1; break;
        case 'D': snake.vx = 1; snake.vy = 0; break;
        case ' ': snake.grow(); break;
        default: break;
        }
        
    });

    app.stage.addChild(snake);
    snake.x = app.view.width / 2;
    snake.y = app.view.height / 2 - gridCell;
    // app.ticker.add((delta) => {
    //     gameLoop(delta);
    // });
    gameLoop();
}

function gameLoop(delta) {
    snake.move();
    setTimeout(gameLoop, 1000 / 15);
}
setup();

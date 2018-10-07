import * as PIXI from 'pixi.js';
import Snake from './snake';
import keyboard from './keyboard';

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

const left = keyboard(37);
const up = keyboard(38);
const right = keyboard(39);
const down = keyboard(40);

function setup() {
    left.press = () => {
        snake.vx = -1;
        snake.vy = 0;
    };
    // Left arrow key `press` method
    left.press = () => {
        // Change the snake's velocity when the key is pressed
        snake.vx = -1;
        snake.vy = 0;
    };

    // Left arrow key `release` method
    left.release = () => {
        // If the left arrow has been released, and the right arrow isn't down,
        // and the snake isn't moving vertically:
        // Stop the snake
        if (!right.isDown && snake.vy === 0) {
            snake.vx = 0;
        }
    };

    // Up
    up.press = () => {
        snake.vy = -1;
        snake.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && snake.vx === 0) {
            snake.vy = 0;
        }
    };

    // Right
    right.press = () => {
        snake.vx = 1;
        snake.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && snake.vy === 0) {
            snake.vx = 0;
        }
    };

    // Down
    down.press = () => {
        snake.vy = 1;
        snake.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && snake.vx === 0) {
            snake.vy = 0;
        }
    };
    app.stage.addChild(snake);
    snake.x = app.view.width / 2;
    snake.y = app.view.height / 2 - gridCell;
    snake.grow();
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

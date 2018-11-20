import * as PIXI from 'pixi.js';
import { Snake, Food } from './snake';

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

const tileSize = 20;
let snake;
let food;

function setup() {
    snake = new Snake(tileSize, app.view.height, app.view.width);
    app.stage.addChild(snake);

    food = new Food(tileSize, app.view.height, app.view.width);
    app.stage.addChild(food);

    // Set Snake starting point
    snake.x = app.view.width / 2;
    snake.y = app.view.height / 2 - tileSize;


    // Handle keyboard events
    window.addEventListener('keydown', (e) => {
        switch (e.key.toUpperCase()) {
        case 'W': snake.currDirection = snake.directions.NORTH; break;
        case 'A': snake.currDirection = snake.directions.WEST; break;
        case 'S': snake.currDirection = snake.directions.SOUTH; break;
        case 'D': snake.currDirection = snake.directions.EAST; break;
        default: break;
        }
    });

    gameLoop();
}

function gameLoop() {
    snake.move();

    // Think about changing dealing with snake eating food in Snake class
    if (snake.body[0].getGlobalPosition().x === food.position.x
    && snake.body[0].getGlobalPosition().y === food.position.y) {
        snake.grow();
        food.generateNew();
    }
    // Set gameloop at 15 frames per second
    setTimeout(gameLoop, 1000 / 15);
}
setup();

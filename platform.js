import { controller } from "./controller.js";
import { spriteSheet }  from "./spriteSheet.js";
import { sprite } from "./sprite.js";
var display, buffer, loop;

buffer = document.createElement('canvas').getContext('2d')
display = document.querySelector('canvas').getContext('2d');


const SPRITE_SIZE_X = 70;
const SPRITE_SIZE_Y = 90;

/////////////////LOOP/////////////////////
let accumTime = window.performance.now();
let timeStep = 1000/100;

loop = (timestamp) => {

    if (controller.up && sprite.jumping === false){
        sprite.y_velocity -= 13;
        sprite.jumping = true;
    };
    
    if (controller.left){
        sprite.x_velocity -= .8
        sprite.animation.change(spriteSheet.frameSets[1], 15)
    };

    if (controller.right){
        sprite.x_velocity += .8
        sprite.animation.change(spriteSheet.frameSets[2], 15)
    };

    // still animation
    if(!controller.right && !controller.left){
        sprite.animation.change(spriteSheet.frameSets[0], 45);
    };

    sprite.y_velocity += .3;
    sprite.x += sprite.x_velocity;
    sprite.y += sprite.y_velocity;
    sprite.x_velocity *= .6;
    sprite.y_velocity *= 1;
    

    if (sprite.y > 700 - sprite.height - 100 - 6){
        sprite.jumping = false;
        sprite.y = 700 - sprite.height - 100 - 6;
        sprite.y_velocity = 0;
    }

    if(sprite.x < -sprite.width){
        sprite.x = 1000
    } else if (sprite.x > 1000){
        sprite.x = -sprite.width;
    };

    // code for loop and render timing to be same on all devices
    if(timestamp >= accumTime + timeStep){
        if (timestamp - accumTime >= timeStep * 4 ){
            accumTime = timestamp;
        };
        while(accumTime < timestamp){
            accumTime += timeStep

            sprite.animation.update();
        }
        render();
    }
    window.requestAnimationFrame(loop);

    // const milsSinceLastRender = (timestamp - lastRenderTime)
    // if (milsSinceLastRender < 1000 / 60) return // lock in 60fps

    // lastRenderTime = timestamp

    // sprite.animation.update();
    // render();
    
    // setTimeout may be a good way to make movement consistent across devices as powerful devices loop faster
};


let render = function(){

    ///// CANVAS BACKGROUND //////
    buffer.strokeStyle = '#a4a4dd';
    buffer.lineJoin = "round";
    buffer.lineWidth = 6;
    buffer.fillStyle = "grey";
    buffer.fillRect(0,0, 1000, 700);

    ///// BEZIER CURVE //////
    buffer.beginPath();
    buffer.moveTo(0, 70);
    buffer.bezierCurveTo(180, 0, 360, 140, 500, 70);
    buffer.bezierCurveTo(640, 0, 820, 140, 1000, 70);
    buffer.stroke()


    ///DRAW A TRIANGLE!!!////
    buffer.strokeStyle = "#ffffff";
    buffer.lineWidth = 6;
    buffer.fillStyle = "red";
    buffer.beginPath();
    buffer.moveTo(500, 50);
    buffer.lineTo(300, 300);
    buffer.lineTo(700, 300);
    buffer.closePath();
    buffer.fill();
    buffer.stroke();

    ///// BOX HOUSE BODY/////
    buffer.fillStyle = "green";
    buffer.beginPath();
    buffer.rect(300, 300, 400, 300);
    buffer.fill();
    buffer.stroke();

    /// ATTIC WINDOW /////
    buffer.fillStyle = "blue";
    buffer.beginPath();
    buffer.arc(500, 175, 40, 0, Math.PI*2);
    buffer.fill();
    buffer.stroke();

    ////// BOUNCY BOX//////
    // buffer.beginPath();
    // buffer.fillStyle = "purple";
    // buffer.rect(sprite.x, sprite.y, sprite.width, sprite.height);
    // buffer.fill();
    // buffer.stroke();
    
    
    ////// FLOOR///////
    buffer.strokeStyle = "#202830";
    buffer.lineWidth = 8;
    buffer.beginPath();
    buffer.moveTo(0, 600);
    buffer.lineTo(1000, 600);
    buffer.stroke();

    buffer.drawImage(spriteSheet.image, sprite.animation.frame * SPRITE_SIZE_X, 0, sprite.width, sprite.height, Math.floor(sprite.x), Math.floor(sprite.y + 4), SPRITE_SIZE_X, SPRITE_SIZE_Y);
    
    display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);
}

let resize = function(){

    display.canvas.width = document.documentElement.clientWidth - 32;

    if (display.canvas.width > document.documentElement.clientHeight){
        display.canvas.width = document.documentElement.clientHeight;
    };

    display.canvas.height = display.canvas.width * 0.7;

};

buffer.canvas.width = 1000;
buffer.canvas.height = 700;

window.addEventListener("resize", resize);

resize();

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
spriteSheet.image.addEventListener("load", (e) => {
    window.requestAnimationFrame(loop);
});


var context, controller, sprite, loop;

context = document.querySelector('canvas').getContext('2d');

context.canvas.height = 700;
context.canvas.width = 1000;



/////////////////////SPRITE////////////////////////
sprite = {
    height: 90,
    width: 90,
    jumping: false,
    x: 500,
    y: 0,
    x_velocity: 0,
    y_velocity: 0
};


/////////////////CONTROLLER/////////////////////////
controller = {
    left: false,
    right: false,
    up: false,

    keyListener: (e) => {
        var keyState = (e.type === 'keydown') ? true : false;

        switch(e.keyCode){

            case 37:
                controller.left = keyState
            break;
            case 65:
                controller.left = keyState
            break;
            case 38:
                controller.up = keyState
            break;
            case 87:
                controller.up = keyState
            break;
            case 39:
                controller.right = keyState
            break;
            case 68:
                controller.right = keyState
            break;
        };
    }
};

/////////////////LOOP/////////////////////

loop = () => {

    if (controller.up && sprite.jumping === false){
        sprite.y_velocity -= 30;
        sprite.jumping = true;
    };
    
    if (controller.left){
        sprite.x_velocity -= 1.5
    };

    if (controller.right){
        sprite.x_velocity += 1.5
    };

    sprite.y_velocity += 1.5;
    sprite.x += sprite.x_velocity;
    sprite.y += sprite.y_velocity;
    sprite.x_velocity *= .9;
    sprite.y_velocity *= 1;
    

    if (sprite.y > 700 - sprite.width - 100){
        sprite.jumping = false;
        sprite.y = 700 - sprite.width - 100;
        sprite.y_velocity = 0;
    }

    if(sprite.x < -sprite.width){
        sprite.x = 1000
    } else if (sprite.x > 1000){
        sprite.x = -sprite.width;
    }

    context.fillStyle = "grey"
    context.fillRect(0,0, 1000, 700);
    context.beginPath();
    context.fillStyle = "purple";
    context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
    context.fill();
    context.strokeStyle = "#202830";
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(0, 600);
    context.lineTo(1000, 600);
    context.stroke();

    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
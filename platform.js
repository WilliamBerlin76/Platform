var context, controller, sprite, loop;

context = document.querySelector('canvas').getContext('2d');

context.canvas.height = 700;
context.canvas.width = 1000;


sprite = {
    height: 50,
    width: 50,
    jumping: false,
    x: 500,
    y: 0,
    x_velocity: 0,
    y_velocity: 0
};

controller = {
    left: false,
    right: false,
    up: false,

    keyListener: (e) => {
        var keyState = (e.type === 'keydown') ? true : false;

        switch(e.keyCode){

            case 37:
                controller.left = keyState
                console.log('l')
                break;
            case 38:
                controller.up = keyState
                console.log('u')
                break;
            case 39:
                controller.right = keyState
                console.log('r')
                break;
        };
    }
};

/////////////////LOOP/////////////////////

loop = () => {

    if (controller.up && sprite.jumping === false){
        sprite.y_velocity -= 20;
        sprite.jumping = true;
    };
    
    if (controller.left){
        sprite.x_velocity -= .5
    };

    if (controller.right){
        sprite.x_velocity += .5
    };

    sprite.y_velocity = 3.5;
    sprite.x += sprite.x_velocity;
    sprite.y += sprite.y_velocity;
    sprite.x_velocity *= .5;
    sprite.y_velocity *= .5;

    context.fillStyle = "grey"
    context.fillRect(0,0, 1000, 7000);
    context.beginPath();
    context.fillStyle = "purple";
    context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
    context.fill();
    // context.strokeStyle = "#202830";
    // context.lineWidth = 4;
    // context.beginPath();
    // context.moveTo(0, 164);
    // context.lineTo(320, 164);
    // context.stroke();

    window.requestAnimationFrame(loop);
};



window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);